import { axiosInstance } from "../axiosInstance";
import {
  updateUserProfilePayload,
  userProfilePayload,
  profileBlockedPayload,
  usernameCheckPayload,
} from "./userInterface";

//get user profile:----
export const userProfile = async (payload: userProfilePayload) => {
  const response = await axiosInstance.post(
    "/api/second_user_profile",
    payload
  );
  return response.data;
};
export const updateUserProfile = async (payload: updateUserProfilePayload) => {
  const response = await axiosInstance.post("/api/user_profile", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// profile Blocked:---
export const profileBlocked = async (payload: profileBlockedPayload) => {
  const response = await axiosInstance.post("/api/profile_blocked", payload);
  return response.data;
};

// profile Blocked:---
export const usernameCheck = async (payload: usernameCheckPayload) => {
  const response = await axiosInstance.post("/api/username_check", payload);
  return response.data;
};
