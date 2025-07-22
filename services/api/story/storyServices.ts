import { axiosInstance } from "../axiosInstance";
import { addStoryHighlightPayload, addStoryPayload, deleteStoryPayload, likeStoryPayload, myStoryDeletePayload, secondUserStoryHighlightPayload, storySeenListPayload, viewStoryPayload } from './storyInterface';


// add Story:---
export const addStory = async (payload: addStoryPayload) => {
  const response = await axiosInstance.post("/api/add_story", payload);
  return response.data;
};

// delete Story:---
export const deleteStory = async (payload: deleteStoryPayload) => {
  const response = await axiosInstance.post("/api/delete_story", payload);
  return response.data;
};

// view Story:---
export const viewStory = async (payload: viewStoryPayload) => {
  const response = await axiosInstance.post("/api/view_story", payload);
  return response.data;
};

// like Story:---
export const likeStory = async (payload: likeStoryPayload) => {
  const response = await axiosInstance.post("/api/like_story", payload);
  return response.data;
};

// add Story Highlight:---
export const addStoryHighlight = async (payload: addStoryHighlightPayload) => {
  const response = await axiosInstance.post("/api/add_story_hightlight", payload);
  return response.data;
};

// stroy Seen List:---
export const storySeenList = async (payload: storySeenListPayload) => {
  const response = await axiosInstance.post("/api/story_seen_list", payload);
  return response.data;
};

// my Story Delete:---
export const myStoryDelete = async (payload: myStoryDeletePayload) => {
  const response = await axiosInstance.post("/api/my_story_delete", payload);
  return response.data;
};

// second User Story Highlight:---
export const secondUserStoryHighlight = async (payload: secondUserStoryHighlightPayload) => {
  const response = await axiosInstance.post("/api/second_user_story_hightlight", payload);
  return response.data;
};

// Get Story By User:---
export const getStoryByUser = async () => {
  const response = await axiosInstance.post("/api/get_story_by_user");
  return response.data;
};

// My Story Highlight:---
export const myStoryHighlight = async () => {
  const response = await axiosInstance.post("/api/my_story_hightlight");
  return response.data;
};
