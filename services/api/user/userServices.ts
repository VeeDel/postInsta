import { axiosInstance } from "../axiosInstance";
import { updateUserProfilePayload, userProfilePayload } from "./userInterface";

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

// get Second User Profile:---
export const getSecondUserProfile = async (payload: userProfilePayload) => {
  const response = await axiosInstance.post(
    "/api/second_user_profile",
    payload
  );
  return response.data;
};
