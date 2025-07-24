import { useEffect, useState, useRef } from "react";
import cn from "classnames";
import Avatar from "@/components/Avatar";
import Actions from "@/components/Actions";
import ScrollMask from "@/components/ScrollMask";
import Message from "@/components/Message";
import NewMessage from "@/components/NewMessage";
import Icon from "@/components/Icon";
import NoMessages from "./NoMessages";
import styles from "./Messanger.module.sass";
import { messagesList } from "@/mocks/messages";
import { useChatStore } from "@/store/chatStore/chatStore";

type MessangerProps = {
  onClose?: () => void;
};

const Messanger = ({ onClose }: MessangerProps) => {
  const [snoozeNotifications, setSnoozeNotifications] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { messages, chatlist, activeConversation } = useChatStore();

  // Create ref for scrolling to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const actions = [
    {
      title: "Leave coversation",
      onClick: () => console.log("Leave coversation"),
    },
    {
      title: "Block",
      onClick: () => console.log("Block"),
    },
    {
      title: "Report",
      onClick: () => console.log("Report"),
    },
    {
      title: "Snooze notifications",
      checked: snoozeNotifications,
      onChange: () => setSnoozeNotifications(!snoozeNotifications),
    },
  ];

  const currentChat = chatlist.find((ct) => ct.second_id == activeConversation);
  console.log(currentChat);

  const sortedMessages = messages?.slice().sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when messages change or active conversation changes
  useEffect(() => {
    if (messages && messages.length > 0) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages, activeConversation]);

  // Scroll to bottom when component mounts and has messages
  useEffect(() => {
    if (messages && messages.length > 0) {
      scrollToBottom();
    }
  }, []);

  return (
    <div className={cn("row-container", styles.messanger)}>
      <div className={styles.head}>
        <div className={styles.profile}>
          <Avatar
            className={styles.avatar}
            photo={currentChat?.profile_pic || ""}
            online={true}
          />
          {currentChat?.first_name}
        </div>
        <Actions
          className={styles.actions}
          classBody={styles.actionsBody}
          items={actions}
          headButton
          onlyText
        />
        <button className={cn("button-circle", styles.close)} onClick={onClose}>
          <Icon name="close-large" />
        </button>
      </div>
      {messages?.length > 0 ? (
        <ScrollMask className={styles.body} ref={scrollContainerRef}>
          <div className={styles.list}>
            {sortedMessages?.map((item) => (
              <Message item={item} key={item.id} />
            ))}
            {/* Invisible div for scrolling reference */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollMask>
      ) : (
        <NoMessages />
      )}
      <NewMessage
        className={styles.newMessage}
        content={newMessage}
        setContent={setNewMessage}
        messagesEndRef={messagesEndRef} // Pass the ref to NewMessage
      />
    </div>
  );
};

export default Messanger;
