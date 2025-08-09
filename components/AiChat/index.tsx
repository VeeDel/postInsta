
import { ChangeEvent, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import Image from "@/components/Image";
import AddMedia from "@/components/AddMedia";
import useEventsStore from "@/store/useEventsStore";
import styles from "./AiChat.module.sass";
import Icon from "@/components/Icon";

type Message = {
  id: string;
  content: string;
  file?: boolean;
  timestamp: Date;
  isUser: boolean;
  image?: string;
};

type AiChatProps = {
  className?: string;
  classAddMedia?: string;
  classBodyAddMedia?: string;
  content: string;
  setContent: (content: string) => void;
  messages: Message[];
  onSendMessage: (message: string, imageFile?: File) => void;
  reply?: boolean;
  bodyUp?: boolean;
  bodyLeft?: boolean;
  full?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
};

const AiChat = ({
  className,
  classAddMedia,
  classBodyAddMedia,
  content,
  setContent,
  messages,
  onSendMessage,
  bodyUp,
  bodyLeft,
  reply,
  full,
  placeholder,
  autoFocus,
}: AiChatProps) => {
  const { isAiChat } = useEventsStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  // Handle image selection
  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // Remove selected image
  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleSendMessage = () => {
    if (!content.trim() && !selectedImage) {
      return;
    }
    
    onSendMessage(content.trim(), selectedImage || undefined);
    setContent("");
    handleRemoveImage();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const showButton = content !== "" || selectedImage || isAiChat || full;

  return (
    <div
      className={cn(styles.form, className, {
        [styles.active]: showButton,
      })}
    >
      <div className={styles.head}>
        
        <div className={styles.wrap}>
          {/* Image Preview */}
          {imagePreview && (
            <div className={styles.preview}>
              <img src={imagePreview} alt="Preview" />
              <button
                onClick={handleRemoveImage}
                className={cn("button-circle", styles.close)}
              >
                ×
              </button>
            </div>
          )}
          
          <div className={styles.field}>
            <TextareaAutosize
              className={styles.input}
              placeholder={
                selectedImage
                  ? "Add a caption..."
                  : placeholder ||
                    (reply ? "Post your reply..." : "Start a chat...")
              }
              autoFocus={autoFocus}
              value={content}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              minRows={1}
              maxRows={5}
            />
          </div>
          {showButton && (
            <button
              onClick={handleSendMessage}
              className={cn("button", styles.button, {
                [styles.buttonForReply]: reply,
              })}
            >
              {reply ? "Reply" : "Send"}
            </button>
          )}
        </div>
      </div>
      
      <div className={styles.foot}>
        <div className={styles.control}>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageSelect(file);
              }
            }}
          />
        
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn("button-circle", classAddMedia)}
            title="Upload Image"
          >
            <Icon name='image'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;