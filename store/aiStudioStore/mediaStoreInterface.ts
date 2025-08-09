export interface MediaFile {
  id: string;
  file: File;
  url?: string;
  uploading: boolean;
  error?: string;
  uploadedAt?: Date;
}

export interface MediaStoreState {
  files: Record<string, MediaFile>;
  isUploading: boolean;
  error: string | null;
}

export interface MediaStoreActions {
  addFile: (id: string, file: File) => void;
  setFileUrl: (id: string, url: string) => void;
  setFileUploading: (id: string, uploading: boolean) => void;
  setFileError: (id: string, error: string) => void;
  removeFile: (id: string) => void;
  clearError: () => void;
  clearAllFiles: () => void;
}

export interface MediaStore extends MediaStoreState, MediaStoreActions {}
