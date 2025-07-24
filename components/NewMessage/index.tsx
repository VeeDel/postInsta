import { useState, ChangeEvent, useRef, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import AddMedia from "@/components/AddMedia";
import styles from "./NewMessage.module.sass";
import {
  sendChatMessage,
  getMessageList,
} from "services/api/chat/chatServices";
import { useChatStore } from "@/store/chatStore/chatStore";

type NewMessageProps = {
  className?: string;
  content: string;
  setContent: (content: string) => void;
  messagesEndRef?: React.RefObject<HTMLDivElement>; // Ref passed from parent
};

const NewMessage = ({
  className,
  content,
  setContent,
  messagesEndRef,
}: NewMessageProps) => {
  const [recording, setRecording] = useState(false);
  const mobile = useMediaQuery("(max-width: 767px)");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { activeConversation, setMessages, addMessage } = useChatStore();

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Optionally trigger send message on Enter
      // SendMessage();
    }
  };

  const getUsermessage = async () => {
    try {
      const response = await getMessageList({ to_user: activeConversation });
      setMessages(response?.chat);
    } catch (error) {
      console.log(error);
    }
  };

  const SendMessage = async () => {
    try {
      const formData = new FormData();

      // Add the recipient user ID
      formData.append("to_user", activeConversation);

      // Check if there's a file selected
      if (selectedFile) {
        // If file is selected, append the file
        formData.append("url", selectedFile);
        // Optionally add a message with the file
        if (content.trim()) {
          formData.append("message", content);
        }
      } else if (content.trim()) {
        // If no file but there's a text message
        formData.append("message", content);
      } else {
        // Neither file nor message - don't send anything
        return;
      }

      // Add message to store immediately for better UX
      addMessage({
        to_user: activeConversation,
        message: content,
        type: "",
        uri: "",
        video_thumbnail: "",
        reel_id: "",
        stroy_id: "",
      });

      // Clear the message input
      setContent("");

      // Scroll to bottom after adding message
      setTimeout(() => {
        scrollToBottom();
      }, 100);

      const response = await sendChatMessage(formData);

      // Refresh messages from server
      await getUsermessage();

      // Clear file selection
      setSelectedFile(null);

      // Ensure scroll to bottom after server response
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className={cn(styles.newMessage, className)}>
      <div className={cn(styles.form, { [styles.recording]: recording })}>
        {recording ? (
          <>
            <button
              className={cn("button-circle", styles.button)}
              onClick={() => setRecording(false)}
            >
              <Icon name="close" />
            </button>
            <div className={styles.waveform}>
              <div className={styles.image}>
                <Image
                  src="/images/audio-waveform.svg"
                  width={452}
                  height={24}
                  alt=""
                />
              </div>
            </div>
            <div className={styles.time}>0:30</div>
            <button
              className={cn("button-circle", styles.button)}
              onClick={() => setRecording(false)}
            >
              <Icon name="arrow-right" />
            </button>
          </>
        ) : (
          <>
            <div className={styles.load}>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <Icon name="upload" />
            </div>
            <div className={styles.field}>
              <TextareaAutosize
                className={styles.input}
                placeholder="Start a new message..."
                maxRows={8}
                value={content}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus={!mobile}
              />
            </div>
            {content === "" ? (
              <button
                className={styles.button}
                onClick={() => setRecording(true)}
              >
                <Icon name="audio-wave" />
              </button>
            ) : (
              <div className={styles.controls}>
                <AddMedia
                  className={styles.addMedia}
                  headClassName={styles.headAddMedia}
                  bodyClassName={styles.bodyAddMedia}
                  emoji
                />
                <button
                  className={cn("button-circle", styles.send)}
                  onClick={() => SendMessage()}
                >
                  <Icon name="arrow-right" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewMessage;
