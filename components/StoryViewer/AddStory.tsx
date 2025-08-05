import React, { useRef, useState } from "react";
import styles from "./AddStory.module.sass";
import { addStory } from "services/api/story/storyServices";

interface AddStoryProps {
  storyImage?: string;
  profilePic?: string;
  hasStory: boolean;
  refreshStories: () => void;
  onViewMyStory: () => void; // to trigger StoryViewer
}

const AddStory: React.FC<AddStoryProps> = ({
  storyImage,
  profilePic,
  hasStory,
  refreshStories,
  onViewMyStory,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering view story
    fileInputRef.current?.click();
  };

  const handleContainerClick = () => {
    if (hasStory) {
      onViewMyStory();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("url", file);

    setUploading(true);
    try {
      await addStory(formData);
      refreshStories();
    } catch (error) {
      console.error("Story upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className={styles.storyItem} onClick={handleContainerClick}>
        <div
          className={`${styles.outerRing} ${
            !hasStory ? styles.addStoryRing : ""
          }`}
        >
          <img
            src={profilePic || "/assets/default-profile.png"}
            alt="Your Story"
            className={styles.avatar}
          />
          {/* "+" icon always shown at bottom right */}
          <div className={styles.addIcon} onClick={handleAddClick}>
            +
          </div>
        </div>
        <span className={styles.username}>Your Story</span>
      </div>

      <input
        id="storyUpload"
        type="file"
        ref={fileInputRef}
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default AddStory;
