"use client";
import React, { useEffect, useState } from "react";
import styles from "./StoryViewer.module.sass";
import Icon from "@/components/Icon";
import {
  likeStory,
  viewStory,
  storySeenList,
} from "services/api/story/storyServices";
import { viewStoryPayload } from "services/api/story/storyInterface";
import { sendChatMessage } from "services/api/chat/chatServices";

interface StoryImage {
  story_id: number;
  url: string;
  type: string | null;
  created_at: string;
  location: string;
  text: string;
  is_like: string;
  is_seen: number;
}

interface Viewer {
  user_id: string;
  story_id: string;
  created_at: string;
  username: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  profile_pic: string;
}

interface StoryViewerProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  profilePic: string;
  user_id: string;
  storyImages: StoryImage[];
  isMyStory?: boolean;
  onAddNewStory?: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  isOpen,
  onClose,
  username,
  profilePic,
  storyImages,
  user_id,
  isMyStory = false,
  onAddNewStory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [showViewers, setShowViewers] = useState(false);
  const [viewers, setViewers] = useState<Viewer[]>([]);

  const LikeStory = async () => {
    try {
      setLiked(true);
      await likeStory({
        story_id: storyImages[currentIndex].story_id.toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ViewedStory = async () => {
    try {
      const payload: viewStoryPayload = {
        story_id: storyImages[currentIndex].story_id.toString(),
      };
      await viewStory(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchViewers = async () => {
    try {
      const res = await storySeenList({
        story_id: storyImages[currentIndex].story_id.toString(),
      });
      setViewers(res?.story_seen || []);
    } catch (error) {
      console.log("Error fetching viewers:", error);
    }
  };

  const toggleViewersDrawer = () => {
    if (!showViewers) fetchViewers();
    setShowViewers((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    ViewedStory();

    const timer = setTimeout(() => {
      if (currentIndex + 1 < storyImages.length) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setAnimationKey((prev) => prev + 1);
      } else {
        onClose(); // Auto-close if it's the last story
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [isOpen, currentIndex, storyImages.length, onClose]);

  if (!isOpen) return null;

  const currentStory = storyImages[currentIndex];
  const isVideo = currentStory.url.endsWith(".mp4");

  const SendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append("to_user", user_id);
      formData.append(
        "story_id",
        storyImages[currentIndex].story_id.toString()
      );
      formData.append("message", comment);

      // if (audioBlob) {
      //   formData.append("url", audioBlob, "audio.webm");
      // }

      await sendChatMessage(formData);
      setComment("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <div className={styles.progressContainer}>
          {storyImages.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressBar} ${
                index < currentIndex ? styles.completed : ""
              }`}
            >
              {index === currentIndex && (
                <div key={animationKey} className={styles.progressFill} />
              )}
            </div>
          ))}
        </div>
        <img src={profilePic} className={styles.avatar} alt="user" />
        <span className={styles.username}>{username}</span>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>

      <div className={styles.storyContent}>
        {isVideo ? (
          <video
            key={currentStory.story_id}
            className={styles.storyVideo}
            // controls
            autoPlay
            muted
          >
            <source src={currentStory.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={currentStory.url}
            alt="story"
            className={styles.storyImage}
          />
        )}
      </div>

      <div className={styles.footer}>
        {isMyStory ? (
          <>
            <button
              className={styles.addNewStoryBtn}
              onClick={onAddNewStory}
              title="Add New Story"
            >
              <Icon name="plus" />
            </button>
            <button className={styles.viewersBtn} onClick={toggleViewersDrawer}>
              <Icon name="eye" />
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Send message..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.commentInput}
            />
            {comment ? (
              <button
                className={styles.sendButton}
                onClick={() => SendMessage()}
              >
                <Icon name="arrow-right" />
              </button>
            ) : (
              <button
                className={`${styles.likeButton} ${liked ? styles.liked : ""}`}
                onClick={LikeStory}
              >
                {liked ? <Icon name="heart-fill" /> : <Icon name="heart" />}
              </button>
            )}
          </>
        )}
      </div>

      {/* Bottom Drawer */}
      {showViewers && (
        <div className={styles.viewersDrawer}>
          <div className={styles.drawerHeader}>
            <h3>Seen by</h3>
            <button onClick={() => setShowViewers(false)}>✕</button>
          </div>
          <div className={styles.viewerList}>
            {viewers &&
              viewers.map((viewer) => (
                <div key={viewer.user_id} className={styles.viewerItem}>
                  <img
                    src={viewer.profile_pic || "/default-avatar.png"}
                    alt={viewer.username}
                    className={styles.viewerAvatar}
                  />
                  <div>
                    <div className={styles.viewerName}>
                      {viewer.first_name} {viewer.last_name}
                    </div>
                    <div className={styles.viewerUsername}>
                      @{viewer.username}
                    </div>
                  </div>
                </div>
              ))}
            {viewers.length === 0 && (
              <p className={styles.noViewers}>No viewers yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryViewer;
