import { ChangeEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import Image from "@/components/Image";
import AddMedia from "@/components/AddMedia";
import useEventsStore from "@/store/useEventsStore";
import styles from "./NewPost.module.sass";
import { addPost, postAddComment } from "services/api/post/postServices";
import Icon from "../Icon";

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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    // Create image preview URL
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
    if (!content || content.trim() === "") {
      return;
    }
    try {
      // Check if reply is true to decide which function to call
      if (reply) {
        await handleReply();
      } else {
        await handlePost();
      }

      // Clear content and image after successful API call
      setContent("");
      removeImage();
    } catch (error) {
      console.error("Error in posting:", error);
    }
  };
  console.log("selected image", selectedImage);
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);

      // Add image to formData if selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      console.log("formdata", formData);

      // const res = await addPost(formData);
      // console.log("response of image upload", res);
      // return res;
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
          <Image src="/images/avatar.png" width={44} height={44} alt="" />
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
