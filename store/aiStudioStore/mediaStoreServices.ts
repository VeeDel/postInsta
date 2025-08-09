import { create } from 'zustand';
import { MediaStore, MediaFile } from './mediaStoreInterface';

const useMediaStore = create<MediaStore>((set, get) => ({
  // State
  files: {},
  isUploading: false,
  error: null,

  // Actions
  addFile: (id: string, file: File) => {
    set((state) => ({
      files: {
        ...state.files,
        [id]: {
          id,
          file,
          uploading: false,
          error: undefined,
        },
      },
      error: null,
    }));
  },

  setFileUrl: (id: string, url: string) => {
    set((state) => ({
      files: {
        ...state.files,
        [id]: {
          ...state.files[id],
          url,
          uploading: false,
          uploadedAt: new Date(),
        },
      },
    }));
  },

  setFileUploading: (id: string, uploading: boolean) => {
    set((state) => ({
      files: {
        ...state.files,
        [id]: {
          ...state.files[id],
          uploading,
        },
      },
      isUploading: uploading,
    }));
  },

  setFileError: (id: string, error: string) => {
    set((state) => ({
      files: {
        ...state.files,
        [id]: {
          ...state.files[id],
          error,
          uploading: false,
        },
      },
      error,
    }));
  },

  removeFile: (id: string) => {
    set((state) => {
      const { [id]: removed, ...restFiles } = state.files;
      return {
        files: restFiles,
      };
    });
  },

  clearError: () => {
    set({ error: null });
  },

  clearAllFiles: () => {
    set({
      files: {},
      isUploading: false,
      error: null,
    });
  },
}));

export default useMediaStore;
