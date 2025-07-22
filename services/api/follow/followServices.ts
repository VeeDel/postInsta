import { axiosInstance } from "../axiosInstance";
import { followUserPayload, getSecondUserFollowersPayload, getSecondUserFollowingPayload } from './followInterface';


// follow user:---
export const followUser = async (payload: followUserPayload) => {
  const response = await axiosInstance.post("/api/follow", payload);
  return response.data;
};

// get Second User Followers:---
export const getSecondUserFollowers = async (payload: getSecondUserFollowersPayload) => {
  const response = await axiosInstance.post("/api/second_user_followers", payload);
  return response.data;
};

// get Second User Following:---
export const getSecondUserFollowing = async (payload: getSecondUserFollowingPayload) => {
  const response = await axiosInstance.post("/api/second_user_following", payload);
  return response.data;
};


// get My Followers:---
export const getMyFollowers = async (payload: getSecondUserFollowingPayload) => {
  const response = await axiosInstance.post("/api/my_followers", payload);
  return response.data;
};


// get My Following:---
export const getMyFollowing = async (payload: getSecondUserFollowingPayload) => {
  const response = await axiosInstance.post("/api/my_following", payload);
  return response.data;
};


