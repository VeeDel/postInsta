import { axiosInstance } from "../axiosInstance";
import { connectServerPayload, userConnectedPayload, userDisconnectedPayload } from './socketInterface';

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



// User DisConnected:---
export const connectServer = async (payload: connectServerPayload) => {
  const response = await axiosInstance.post("/api/connect_server", payload);
  return response.data;
};


