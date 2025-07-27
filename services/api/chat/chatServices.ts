import { axiosInstance } from "../axiosInstance";

import {
  getMessageListPayload,
  newChatApiPayload,
  newMessageListPayload,
  newUserChatListPayload,
  sendChatMessagePayload,
} from "./chatInterface";

//Get User Chat List
export const GetUserChatlist = async () => {
  const response = await axiosInstance.post("/api/user_chat_list");
  return response.data;
};

//Send Chat Message:----
type ChatMessageInput = FormData | sendChatMessagePayload;
export const sendChatMessage = async (payload: ChatMessageInput) => {
  const response = await axiosInstance.post("/api/chat_api", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

//get Message List:----
export const getMessageList = async (payload: getMessageListPayload) => {
  const response = await axiosInstance.post("/api/message_list", payload);
  return response.data;
};

//new Chat APi:----
export const newChatApi = async (payload: newChatApiPayload) => {
  const response = await axiosInstance.post("/api/new_chat_api", payload);
  return response.data;
};

//new User Chat List:----
export const newUserChatList = async (payload: newUserChatListPayload) => {
  const response = await axiosInstance.post("/api/new_user_chat_list", payload);
  return response.data;
};

//new Message List:----
export const newMessageList = async (payload: newMessageListPayload) => {
  const response = await axiosInstance.post("/api/new_message_list", payload);
  return response.data;
};


//get Report Text:----
// export const getReportText = async (payload: getReportTextPayload) => {
//   const response = await axiosInstance.post("/api/get_report_text", payload);
//   return response.data;
// };


//user Chat List:----
export const getUserChatList = async () => {
  const response = await axiosInstance.post("/api/user_chat_list");
  return response.data;
};

