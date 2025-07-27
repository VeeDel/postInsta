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
  messagesEndRef?: React.RefObject<HTMLDivElement>;
};

const NewMessage = ({
  className,
  content,
  setContent,
  messagesEndRef,
}: NewMessageProps) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mobile = useMediaQuery("(max-width: 767px)");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { activeConversation, setMessages, addMessage } = useChatStore();

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
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const clearAudio = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setRecording(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Recording failed:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setMediaRecorder(null);
    setRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const getUserMessages = async () => {
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
      formData.append("to_user", activeConversation);

      if (selectedFile) {
        formData.append("url", selectedFile);
      }

      // if (audioBlob) {
      //   formData.append("url", audioBlob, "audio.webm");
      // }

      if (content.trim()) {
        formData.append("message", content.trim());
      }

      if (!selectedFile && !content.trim() && !audioBlob) return;

      addMessage({
        to_user: activeConversation,
        message: content,
        type: "",
        uri: "",
        video_thumbnail: "",
        reel_id: "",
        stroy_id: "",
      });

      setContent("");
      scrollToBottom();

      await sendChatMessage(formData);
      await getUserMessages();

      setSelectedFile(null);
      setPreviewUrl(null);
      setAudioBlob(null);
      setAudioUrl(null);
      scrollToBottom();
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
              onClick={clearAudio}
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
            <div className={styles.time}>{`0:${String(recordingTime).padStart(
              2,
              "0"
            )}`}</div>
            <button
              className={cn("button-circle", styles.button)}
              onClick={stopRecording}
            >
              <Icon name="arrow-right" />
            </button>
          </>
        ) : audioUrl ? (
          <>
            <button onClick={clearAudio} className={styles.removePreview}>
              <Icon name="close" />
            </button>
            <audio controls src={audioUrl} className={styles.audioPreview} />
            <button
              className={cn("button-circle", styles.send)}
              onClick={SendMessage}
            >
              <Icon name="arrow-right" />
            </button>
          </>
        ) : (
          <>
            <div className={styles.load}>
              <input type="file" onChange={handleFileChange} />
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

            {previewUrl && (
              <div className={styles.preview}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className={styles.previewImage}
                />
                <button
                  onClick={clearSelectedFile}
                  className={styles.removePreview}
                >
                  <Icon name="close" />
                </button>
              </div>
            )}

            {content || selectedFile ? (
              <div className={styles.controls}>
                <AddMedia
                  className={styles.addMedia}
                  headClassName={styles.headAddMedia}
                  bodyClassName={styles.bodyAddMedia}
                  setContent={setContent}
                  content={content}
                  emoji
                />
                <button
                  className={cn("button-circle", styles.send)}
                  onClick={SendMessage}
                >
                  <Icon name="arrow-right" />
                </button>
              </div>
            ) : (
              <button className={styles.button} onClick={startRecording}>
                <Icon name="audio-wave" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewMessage;
