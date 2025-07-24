import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Chatlist,
  GetMessageType,
  SendChatMessage,
} from "./chatStoreInterface";

interface ChatStoreState {
  activeConversation: string | null; // This tracks which user we're chatting with
  messages: GetMessageType[];
  chatlist: Chatlist[];
}

interface ChatStoreActions {
  setActiveConversation: (to_user: string) => void; // Changed to to_user
  addMessage: (message: GetMessageType) => void;
  setMessages: (messages: GetMessageType[]) => void;
  clearChat: () => void;
  setChatlis: (list: Chatlist[]) => void;
}

type ChatStore = ChatStoreState & ChatStoreActions;

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      activeConversation: null,
      messages: [],
      chatlist: [],
      setActiveConversation: (to_user) => {
        console.log("✅ ACTIVE CONVERSATION SET WITH USER:", to_user);
        set({ activeConversation: to_user });
      },
      addMessage: (message) => {
        console.log("💬 MESSAGE ADDED TO STORE:", message);
        set((state) => ({ messages: [...state.messages, message] }));
      },
      setMessages: (messages) => {
        console.log("📨 MESSAGES SET IN STORE:", "messages");
        set({ messages });
      },

      clearChat: () => {
        console.log("🧹 CHAT STORE CLEARED");
        set({ activeConversation: null, messages: [] });
      },
      setChatlis: (list: any) => {
        set({ chatlist: list });
      },
    }),
    {
      name: "chat-storage",
    }
  )
);
