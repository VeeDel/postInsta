import { useEffect } from 'react';
import cn from 'classnames';
import styles from './ImageModal.module.sass';
import Icon from '@/components/Icon';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  close?:string;
  download?:string;

}

const ImageModal = ({ src, alt, isOpen, onClose }: ImageModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      
      // Extract filename from src or use a default name
      const filename = src.split('/').pop()?.split('?')[0] || 'download';
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.overlay}
      onClick={onClose}
    >
      <div 
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={cn("button-circle", styles.closeButton)}
        >
          <Icon name='close'/>
        </button>
        <button
          onClick={handleDownload}
          className={cn("button-circle", styles.downloadButton)}
          title="Download"
        >
          <Icon name='download'/>
        </button>
        <img
          src={src}
          alt={alt}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default ImageModal;