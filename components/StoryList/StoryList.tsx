import React, { useEffect, useState } from "react";
import styles from "./StoryList.module.sass";
import StoryViewer from "../StoryViewer/StoryViewer";
import AddStory from "../StoryViewer/AddStory";
import { getMystory } from "services/api/story/storyServices";

interface StoryImage {
  story_id: number;
  url: string;
  type: string;
  created_at: string;
  location: string;
  text: string;
  is_like: string;
  is_seen: number;
}

interface Story {
  story_id: string;
  user_id: string;
  url: string;
  type: string;
  create_date: string;
  total_stories: number;
  user_read_count: number;
  username: string;
  profile_pic: string;
  story_image: StoryImage[];
}

const StoryList = () => {
  const [myStory, setMyStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const GetStories = async () => {
    try {
      const response = await getMystory();
      setMyStory(response?.my_post?.[0] || null);
      setStories(response?.story || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetStories();
  }, []);

  return (
    <>
      <div className={styles.storyList}>
        {/* Your Story */}
        <AddStory
          hasStory={!!myStory}
          profilePic={myStory?.profile_pic}
          storyImage={myStory?.story_image?.[0]?.url}
          refreshStories={GetStories}
          onViewMyStory={() => setActiveStory(myStory)} // show story if exists
        />

        {/* Other Users' Stories */}
        {Array.isArray(stories) && stories.length === 0
          ? [...Array(6)].map((_, index) => (
              <div key={index} className={styles.storyItem}>
                <div className={`${styles.outerRing} ${styles.skeletonRing}`}>
                  <div className={styles.skeletonAvatar} />
                </div>
                <span className={styles.skeletonUsername} />
              </div>
            ))
          : stories.map((story: Story) => (
              <div
                key={story.story_id}
                className={styles.storyItem}
                onClick={() => setActiveStory(story)}
              >
                <div
                  className={`${styles.outerRing} ${
                    story.story_image[0]?.is_seen ? styles.seen : ""
                  }`}
                >
                  <img
                    src={story.profile_pic}
                    alt={story.username}
                    className={styles.avatar}
                  />
                </div>
                <span className={styles.username}>
                  {story.username.length > 8
                    ? `${story.username.slice(0, 8)}…`
                    : story.username}
                </span>
              </div>
            ))}
      </div>

      {activeStory && (
        <StoryViewer
          isOpen={!!activeStory}
          onClose={() => setActiveStory(null)}
          user_id={activeStory?.user_id}
          username={activeStory.username}
          profilePic={activeStory.profile_pic}
          storyImages={activeStory.story_image}
          isMyStory={activeStory.user_id === myStory?.user_id}
          onAddNewStory={() => document.getElementById("storyUpload")?.click()}
        />
      )}
    </>
  );
};

export default StoryList;
