import { axiosInstance } from "../axiosInstance";
import { newUserChatListPayload, userConnectedPayload, userDisconnectedPayload } from './socketInterface';

// User Connected:---
export const userConnected = async (payload: userConnectedPayload) => {
  const response = await axiosInstance.post("/api/user_connected", payload);
  return response.data;
};

// User DisConnected:---
export const userDisconnected = async (payload: userDisconnectedPayload) => {
  const response = await axiosInstance.post("/api/user_disconnected", payload);
  return response.data;
};

// new User Chat List:---
export const newUserChatList = async (payload: newUserChatListPayload) => {
  const response = await axiosInstance.post("/api/new_user_chat_list", payload);
  return response.data;
};



