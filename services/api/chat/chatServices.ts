import { axiosInstance } from "../axiosInstance";

import { getMessageListPayload, sendChatMessagePayload } from './chatInterface';

//Send Chat Message:----
export const sendChatMessage = async (payload: sendChatMessagePayload) => {
  const response = await axiosInstance.post("/api/chat_api", payload);
  return response.data;
};

//get Message List:----
export const getMessageList = async (payload: getMessageListPayload) => {
  const response = await axiosInstance.post("/api/message_list", payload);
  return response.data;
};


