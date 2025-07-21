import { axiosInstance } from "../axiosInstance";
import {
  addPostPayload,
  commentLikePostPayload,
  getAllLatestReelByPaginationPayload,
  getHashtagsPostPayload,
  getPostDetailsPayload,
  likePostPayload,
  myPostCommentLikeListPayload,
  myPostCommentListPayload,
  myPostReplyLikeListPayload,
  myPostSubcommentLikeListPayload,
  postAddReportPayload,
  postAddSubcommentPayload,
  subCommentLikePostPayload,
} from "./postInterface";

// My Post Comment List:---
export const myPostCommentList = async (payload: myPostCommentListPayload) => {
  const response = await axiosInstance.post(
    "/api/my_post_comment_list",
    payload
  );
  return response.data;
};

// My Post Comment Like List:---
export const myPostCommentLikeList = async (
  payload: myPostCommentLikeListPayload
) => {
  const response = await axiosInstance.post(
    "/api/my_post_comment_like_list",
    payload
  );
  return response.data;
};

// My Post Subcomment Like List:---
export const myPostSubcommentLikeList = async (
  payload: myPostSubcommentLikeListPayload
) => {
  const response = await axiosInstance.post(
    "/api/my_post_subcomment_like_list",
    payload
  );
  return response.data;
};

// My Post Reply Like List:---
export const myPostReplyLikeList = async (
  payload: myPostReplyLikeListPayload
) => {
  const response = await axiosInstance.post(
    "/api/my_post_reply_like_list",
    payload
  );
  return response.data;
};

// get All Latest Reel By Pagination:---
export const getAllLatestReelByPagination = async (
  payload: getAllLatestReelByPaginationPayload
) => {
  const response = await axiosInstance.post(
    "/api/get_all_latest_reel_by_pagination",
    payload
  );
  return response.data;
};

// Add Post:---
export const addPost = async (payload: addPostPayload) => {
  const response = await axiosInstance.post("/api/add_post", payload);
  return response.data;
};

// get Post Details:---
export const getPostDetails = async (payload: getPostDetailsPayload) => {
  const response = await axiosInstance.post("/api/get_post_details", payload);
  return response.data;
};
// get All latest Post :---
export const getAllLatestPost = async () => {
  const response = await axiosInstance.post("/api/get_all_latest_post");
  return response;
};

// like Post:---
export const likePost = async (payload: likePostPayload) => {
  const response = await axiosInstance.post("/api/like_post", payload);
  return response;
};

// comment like post:---
export const commentLikePost = async (payload: commentLikePostPayload) => {
  const response = await axiosInstance.post("/api/comment_like_post", payload);
  return response.data;
};

// Post Add Sub Comment:---
export const postAddSubcomment = async (payload: postAddSubcommentPayload) => {
  const response = await axiosInstance.post(
    "/api/post_add_subcomment",
    payload
  );
  return response.data;
};

// Sub Comment Like Post:---
export const subCommentLikePost = async (
  payload: subCommentLikePostPayload
) => {
  const response = await axiosInstance.post(
    "/api/sub_comment_like_post",
    payload
  );
  return response.data;
};

// post Add Report :---
export const postAddReport = async (payload: postAddReportPayload) => {
  const response = await axiosInstance.post("/api/post_add_report", payload);
  return response.data;
};

// get Hashtags Post:---
export const getHashtagsPost = async (payload: getHashtagsPostPayload) => {
  const response = await axiosInstance.post("/api/get_hashtags_post", payload);
  return response.data;
};
