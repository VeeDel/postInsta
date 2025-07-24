import Link from "next/link";
import cn from "classnames";
import Avatar from "components/Avatar";
import Icon from "components/Icon";
import styles from "./Message.module.sass";

type MessageProps = {
  item: {
    id: string;
    second_id: string;
    first_name: string;
    message: string;
    message_type: string;
    url: string;
    type: string;
    profile_pic: string;
    date: string;
    last_seen: string;
    time: string;
    unread_message: string;
    online: boolean;
    new: boolean;
    requestMessage: boolean;
  };
  active: string;
  onClick: () => void;
};

const Message = ({ item, active, onClick }: MessageProps) => {
  console.log(item);
  return (
    <div
      className={cn(styles.message, {
        [styles.messageRequest]: item.requestMessage,
        [styles.active]: active === item.second_id,
      })}
    >
      <div className={styles.link} onClick={onClick}></div>
      <Avatar
        className={styles.avatar}
        photo={item.profile_pic}
        href={`/profiles/${item.second_id}`}
        online={item.online}
      />
      <div className={styles.details}>
        <div className={styles.line}>
          <Link className={styles.name} href={`/profiles/${item.id}`}>
            {item.first_name}
          </Link>
          <div className={styles.date}>{item.time}</div>
        </div>
        <div className={styles.content}>{item.message}</div>
      </div>
      {item.new && <div className={styles.new}></div>}
      {item.requestMessage && (
        <button className={styles.close}>
          <Icon name="close" />
        </button>
      )}
    </div>
  );
};

export default Message;
