import { useState, useRef, ChangeEvent } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";
import cn from "classnames";
import Icon from "@/components/Icon";
import Emoji from "./Emoji";
import Gif from "./Gif";
import Tag from "./Tag";
import styles from "./AddMedia.module.sass";

type AddMediaProps = {
  className?: string;
  headClassName?: string;
  bodyClassName?: string;
  emoji?: boolean;
  file?: boolean;
  gif?: boolean;
  tag?: boolean;
  bodyUp?: boolean;
  bodyLeft?: boolean;
  setContent?: () => void;
  content?: string;
  onImageSelect?: (file: File) => void;
};

const AddMedia = ({
  className,
  headClassName,
  bodyClassName,
  emoji,
  file,
  gif,
  tag,
  bodyUp,
  bodyLeft,
  setContent,
  content,
  onImageSelect,
}: AddMediaProps) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(ref, () => setVisible(false));
  useHotkeys("esc", () => setVisible(false));

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageSelect) {
      // Check if file is an image
      if (file.type.startsWith("image/")) {
        onImageSelect(file);
      } else {
        alert("Please select an image file");
      }
    }
    // Reset the input value so the same file can be selected again if needed
    event.target.value = "";
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return file ? (
    <div className={cn(headClassName, styles.head)}>
      <input
        ref={fileInputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button onClick={handleFileButtonClick} type="button">
        <Icon name="image" />
      </button>
    </div>
  ) : (
    <div
      className={cn(styles.dropdown, className, {
        [styles.active]: visible,
      })}
      ref={ref}
    >
      <button
        className={cn(headClassName, styles.head)}
        onClick={() => setVisible(!visible)}
      >
        <Icon name={emoji ? "emoji" : gif ? "gif" : "at"} />
      </button>
      <div
        className={cn(bodyClassName, styles.body, {
          [styles.bodyEmoji]: emoji,
          [styles.bodyGif]: gif,
          [styles.bodyTag]: tag,
          [styles.bodyUp]: bodyUp,
          [styles.bodyLeft]: bodyLeft,
        })}
      >
        <div className={styles.inner}>
          {emoji && <Emoji setContent={setContent} content={content} />}
          {gif && <Gif />}
          {tag && <Tag />}
        </div>
      </div>
    </div>
  );
};

export default AddMedia;
