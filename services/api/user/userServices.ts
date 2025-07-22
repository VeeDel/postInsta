import { axiosInstance } from "../axiosInstance";
import { updateUserProfilePayload, userProfilePayload, profileBlockedPayload, usernameCheckPayload, userAddReportPayload } from './userInterface';

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
  const response = await axiosInstance.post(
    "/api/profile_blocked",
    payload
  );
  return response.data;
};

// username Check:---
export const usernameCheck = async (payload: usernameCheckPayload) => {
  const response = await axiosInstance.post(
    "/api/username_check",
    payload
  );
  return response.data;
};

// user Add Reort:---
export const userAddReport = async (payload: userAddReportPayload) => {
  const response = await axiosInstance.post(
    "/api/user_add_report",
    payload
  );
  return response.data;
};






// All userlist:---
export const allUserlist = async () => {
  const response = await axiosInstance.post(
    "/api/all_userlist"
  );
  return response.data;
};



// get Avtar Image:---
export const getAvtarImages = async () => {
  const response = await axiosInstance.post(
    "/api/get_avtar_image"
  );
  return response.data;
};

