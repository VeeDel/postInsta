import { useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./Like.module.sass";
import { likePost } from "services/api/post/postServices";
// import { likePost } from "@/lib/api"; // adjust this import path to your actual API utility

type LikeProps = {
  className?: string;
  count?: number;
  initialLiked?: boolean;
  item: { id: number }; // better typing than 'any'
};

const Like = ({
  className,
  count = 0,
  initialLiked = false,
  item,
}: LikeProps) => {
  const [likeCount, setLikeCount] = useState(count);
  const [liked, setLiked] = useState(initialLiked);
  const [isProcessing, setIsProcessing] = useState(false); // prevent rapid double clicks

  const handleLike = async () => {
    if (isProcessing) return; // prevent spamming
    setIsProcessing(true);

    const prevLiked = liked;
    const prevCount = likeCount;

    // Optimistic update
    const newLiked = !prevLiked;
    setLiked(newLiked);
    setLikeCount(prevCount + (newLiked ? 1 : -1));

    const id = {
      post_id: item?.id,
    };
    try {
      const res = await likePost(id); // API call
      console.log("Like API response:", res);
    } catch (err) {
      console.error("Like API failed:", err);

      // Revert back if failed
      setLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      className={cn("social", className, styles.like, {
        [styles.liked]: liked,
      })}
      onClick={handleLike}
    >
      <div className={styles.icon}>
        <Icon name="heart" />
        <Icon name="heart-fill" />
      </div>
      {likeCount > 0 && <div className={styles.count}>{likeCount}</div>}
    </button>
  );
};

export default Like;
