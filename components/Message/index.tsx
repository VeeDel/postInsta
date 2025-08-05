import { useState, useRef, useEffect, ChangeEvent, useId } from "react";
import { Tooltip } from "react-tooltip";
import TextareaAutosize from "react-textarea-autosize";
import Link from "next/link";
import cn from "classnames";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Picture from "./Picture";
import Audio from "./Audio";
import styles from "./Message.module.sass";
import { GetMessageType } from "@/store/chatStore/chatStoreInterface";

type MessageProps = {
  className?: string;
  item: GetMessageType;
};

const Message = ({ className, item }: MessageProps) => {
  const [isLiked, setIsLiked] = useState(item.reaction);
  const [isEdited, setIsEdited] = useState(false);
  const [content, setContent] = useState(item.message);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const idTooltip = useId();

  const actions = [
    {
      icon: "heart-fat",
      tooltip: "Like",
      onClick: () => setIsLiked(!isLiked),
    },
    {
      icon: "reply-fat",
      tooltip: "Reply",
      onClick: () => {},
    },
    {
      icon: "edit-fat",
      tooltip: "Edit",
      onClick: () => setIsEdited(!isEdited),
    },
  ];

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleBlur = () => {
    setIsEdited(false);
  };

  const handleSave = () => {
    setIsEdited(false);
  };

  const focusTextareaAtEnd = () => {
    if (textareaRef.current) {
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    if (isEdited) {
      focusTextareaAtEnd();
    }
  }, [isEdited]);

  return (
    <div
      className={cn(styles.message, className, {
        [styles.messageReply]: item.reply,
      })}
    >
      {item.reply && (
        <div className={styles.reply}>
          <div className={styles.avatar}>
            <Image src="/images/avatar-7.png" width={20} height={20} alt="" />
          </div>
          <div className={styles.nameReply}>Moyo Shiro</div>
          <div className={styles.contentReply}>
            Sure thing! I&apos;m thinking we could have thumbnail previews for
            photos and videos, a waveform for audio messages, and maybe the
            first few lines for long text messages. Here&apos;s a quick mockup I
            made:
          </div>
        </div>
      )}
      <Link
        className={styles.avatar}
        href={item.from_user ? `/profiles/${item.from_user}` : "/profile"}
      >
        <Image src={item.profile_pic} width={44} height={44} alt="" />
      </Link>
      <div className={styles.details}>
        <div className={styles.head}>
          <Link
            className={styles.name}
            href={item.from_user ? `/profiles/${item.from_user}` : "/profile"}
          >
            {item?.post_user_name || item?.first_name}
          </Link>
          <div className={styles.date}>{item.chat_time}</div>
        </div>
        {isEdited ? (
          <div className={styles.form}>
            <TextareaAutosize
              className={styles.input}
              placeholder="Edit your message"
              value={content}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              autoFocus
              ref={textareaRef}
            />
            <button className={styles.save} onClick={handleSave}>
              <Icon name="check-circle" />
            </button>
          </div>
        ) : (
          <div className={styles.content}>{content}</div>
        )}
        {item.url && <Picture image={item.url} />}
        {item.video_thumbnail && (
          <div className={styles.video}>
            <video playsInline controls>
              <source src={item.video_thumbnail} type="video/mp4" />
            </video>
          </div>
        )}
        {item.audio && <Audio audio={item.audio} />}
        {isLiked && (
          <div className={styles.reaction}>
            <Icon name="heart-fill" />1
          </div>
        )}
      </div>
      <div className={styles.actions}>
        {actions.map((action, index) => (
          <button
            className={cn(styles.action, {
              [styles.disabled]: isEdited && action.icon === "edit-fat",
            })}
            key={index}
            onClick={action.onClick}
            data-tooltip-id={idTooltip}
            data-tooltip-content={action.tooltip}
            data-tooltip-place="top"
          >
            <Icon name={action.icon} />
          </button>
        ))}
      </div>
      <Tooltip id={idTooltip} />
    </div>
  );
};

export default Message;
