import { ChangeEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import Image from "@/components/Image";
import AddMedia from "@/components/AddMedia";
import useEventsStore from "@/store/useEventsStore";
import styles from "./NewPost.module.sass";
import { addPost, postAddComment } from "services/api/post/postServices";
import Icon from "../Icon";
import toast from "react-hot-toast";
import { useUserLoginStore } from "@/store/userstore/userStore";

type NewPostProps = {
  item: any;
  className?: string;
  classAddMedia?: string;
  classBodyAddMedia?: string;
  content: string;
  setContent: (content: string) => void;
  reply?: boolean;
  bodyUp?: boolean;
  bodyLeft?: boolean;
  full?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
};

const NewPost = ({
  item,
  className,
  classAddMedia,
  classBodyAddMedia,
  content,
  setContent,
  bodyUp,
  bodyLeft,
  reply,
  full,
  placeholder,
  autoFocus,
}: NewPostProps) => {
  const { isNewPost } = useEventsStore();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { userDetails } = useUserLoginStore();
  const { profile_pic, first_name, username } = userDetails || {};

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleAddPostOrReply = async () => {
    const isContentEmpty = !content || content.trim() === "";
    const isImageEmpty = !selectedImage;

    if (reply) {
      if (isContentEmpty) {
        toast.error("Reply must contain content.");
        return;
      }
    } else {
      if (isContentEmpty && isImageEmpty) {
        toast.error("Post must contain either content or an image.");
        return;
      }
    }

    try {
      if (reply) {
        await handleReply();
      } else {
        await handlePost();
      }

      setContent("");
      removeImage();
    } catch (error) {
      console.error("Error in posting:", error);
      toast.error("Something went wrong while posting.");
    }
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await addPost(formData);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleReply = async () => {
    try {
      const formData = new FormData();
      formData.append("post_id", item?.id);
      formData.append("text", content);

      // Add image to formData if selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await postAddComment(formData);
      console.log(res);
      console.log("this is a reply");
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const active = isNewPost || content !== "" || full || selectedImage;

  return (
    <div
      className={cn(styles.form, className, {
        [styles.active]: active,
      })}
    >
      <div className={styles.head}>
        <div className={styles.avatar}>
          <Image
            src={profile_pic ?? "/images/avatar.png"}
            width={44}
            height={44}
            alt=""
          />
        </div>
        <div className={styles.wrap}>
          <div className={styles.field}>
            <TextareaAutosize
              className={styles.input}
              placeholder={
                placeholder ||
                (reply ? "Post your reply..." : "Start a post...")
              }
              autoFocus={autoFocus}
              value={content}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {/* Image Preview */}
          {imagePreview && (
            <div className={styles.preview}>
              <Image src={imagePreview} width={688} height={304} alt="" />
              <button
                className={cn("button-circle", styles.close)}
                onClick={removeImage}
              >
                <Icon name="close-large" />
              </button>
            </div>
          )}
          <button
            onClick={handleAddPostOrReply}
            className={cn("button", styles.button, {
              [styles.buttonForReply]: reply,
            })}
          >
            {reply ? "Reply" : "Post"}
          </button>
        </div>
      </div>
      {active && (
        <div className={styles.foot}>
          <div className={styles.control}>
            <AddMedia
              className={classAddMedia}
              bodyClassName={classBodyAddMedia}
              emoji
              bodyUp={bodyUp}
              bodyLeft={bodyLeft}
            />
            <AddMedia
              className={classAddMedia}
              bodyClassName={classBodyAddMedia}
              file
              bodyUp={bodyUp}
              bodyLeft={bodyLeft}
              onImageSelect={handleImageSelect}
            />
            <AddMedia
              className={classAddMedia}
              bodyClassName={classBodyAddMedia}
              gif
              bodyUp={bodyUp}
              bodyLeft={bodyLeft}
            />
            <AddMedia
              className={classAddMedia}
              bodyClassName={classBodyAddMedia}
              tag
              bodyUp={bodyUp}
              bodyLeft={bodyLeft}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPost;
