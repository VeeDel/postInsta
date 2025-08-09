import { useCallback } from 'react';
import { uploadMedia } from 'services/api/aiModel/aiStudioServices';
import useMediaStore from '@/store/aiStudioStore/mediaStoreServices';

interface UseUploadMediaOptions {
  onSuccess?: (url: string, fileId: string) => void;
  onError?: (error: string, fileId: string) => void;
  allowedTypes?: string[];
}

interface UseUploadMediaReturn {
  uploadFile: (file: File, fileId?: string) => Promise<string | null>;
  isUploading: boolean;
  error: string | null;
  clearError: () => void;
}

const useUploadMedia = (options: UseUploadMediaOptions = {}): UseUploadMediaReturn => {
  const {
    onSuccess,
    onError,
    // Updated to only accept images - removed video types
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  } = options;

  const {
    files,
    isUploading,
    error,
    addFile,
    setFileUrl,
    setFileUploading,
    setFileError,
    clearError,
  } = useMediaStore();

  const validateFile = useCallback((file: File): string | null => {
    // Check file type - only images allowed
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Please upload images only (JPEG, PNG, WebP, GIF).`;
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return 'File size must be less than 10MB.';
    }

    return null;
  }, [allowedTypes]);

  const uploadFile = useCallback(async (file: File, fileId?: string): Promise<string | null> => {
    const id = fileId || `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setFileError(id, validationError);
      onError?.(validationError, id);
      return null;
    }

    try {
      // Add file to store
      addFile(id, file);
      setFileUploading(id, true);

      // Create FormData
      const formData = new FormData();
      formData.append('files', file);

      // Upload file
      const response = await uploadMedia({ files: file });

      if (!response) {
        throw new Error('No response received from upload API');
      }

      // Handle different response structures
      let uploadedUrl: string;

      if (response.url) {
        uploadedUrl = response.url;
      } else if (response.data?.url) {
        uploadedUrl = response.data.url;
      } else if (response.file_url) {
        uploadedUrl = response.file_url;
      } else if (response.data?.file_url) {
        uploadedUrl = response.data.file_url;
      } else if (typeof response === 'string') {
        uploadedUrl = response;
      } else {
        throw new Error('Invalid response format: URL not found');
      }

      // Update store with URL
      setFileUrl(id, uploadedUrl);
      onSuccess?.(uploadedUrl, id);
      
      return uploadedUrl;

    } catch (error: any) {
      let errorMessage = 'Failed to upload image';
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setFileError(id, errorMessage);
      onError?.(errorMessage, id);
      
      return null;
    }
  }, [validateFile, addFile, setFileUploading, setFileUrl, setFileError, onSuccess, onError]);

  return {
    uploadFile,
    isUploading,
    error,
    clearError,
  };
};

export default useUploadMedia;
