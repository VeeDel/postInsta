import { axiosInstance } from "../axiosInstance";
import { addReelPayload, allMyPostPaginationPayload, allMyReelPaginationPayload, allMyTagPostPaginationPayload, allMyTagPostPayload, allTagPostUserPayload, bookmarkPostPayload, commentLikeReelPayload, getReelDetailsPayload, likeReelPayload, postOnCommentPayload, postReplyOnCommentPayload, postSubcommentAddReplyPayload, reelAddCommentPayload, reelAddReportPayload, reelAddSubcommentPayload, reelOnCommentPayload, reelReplyOnCommentPayload, reelSubcommentAddReplyPayload, replyLikePostPayload, replyLikeReelPayload, savePostPayload, secondUserAllPostAndReelPayload, secondUserAllPostPaginationPayload, secondUserAllPostPayload, secondUserAllReelPaginationPayload, secondUserAllReelPayload, secondUserTagPostPaginationPayload, secondUserTagPostPayload, subCommentLikeReelPayload } from './postInterface';
import {
  addPostPayload,
  commentLikePostPayload,
  getAllLatestReelAndPostsPayload,
  getAllLatestReelByPaginationPayload,
  getHashtagsPostPayload,
  getPostDetailsPayload,
  likePostPayload,
  myPostCommentLikeListPayload,
  myPostCommentListPayload,
  myPostLikeListPayload,
  myPostReplyLikeListPayload,
  myPostSubcommentLikeListPayload,
  postAddCommentPayload,
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
export const addPost = async (payload: FormData) => {
  const response = await axiosInstance.post("/api/add_post", payload, {
    headers: {
      "Content-Type": "multipart/form-data", // optional — axios usually handles this if you pass FormData
    },
  });
  return response;
};

// get Post Details:---
export const getPostDetails = async (payload: getPostDetailsPayload) => {
  const response = await axiosInstance.post("/api/get_post_details", payload);
  return response;
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

// My Post Like List:---
export const myPostLikeList = async (payload: myPostLikeListPayload) => {
  const response = await axiosInstance.post("/api/my_post_like_list", payload);
  return response.data;
};

// get all latest reel and post pagination:---
export const getAllLatestReelAndPosts = async (
  payload: getAllLatestReelAndPostsPayload
) => {
  const response = await axiosInstance.post(
    "/api/get_all_latest_reel_and_post_pagination",
    payload
  );
  return response.data;
};

// post Add Comment:---
export const postAddComment = async (payload: postAddCommentPayload) => {
  const response = await axiosInstance.post("/api/post_add_comment", payload);
  return response.data;
};

// post Subcomment Add Reply:---
export const postSubcommentAddReply = async (
  payload: postSubcommentAddReplyPayload
) => {
  const response = await axiosInstance.post(
    "/api/post_subcomment_add_reply",
    payload
  );
  return response.data;
};

// reel Subcomment Add Reply:---
export const reelSubcommentAddReply = async (
  payload: reelSubcommentAddReplyPayload
) => {
  const response = await axiosInstance.post(
    "/api/reel_subcomment_add_reply",
    payload
  );
  return response.data;
};

// Reel Like post :---
export const replyLikePost = async (payload: replyLikePostPayload) => {
  const response = await axiosInstance.post("/api/reply_like_post", payload);
  return response.data;
};

// Reel Add Comment :---
export const reelAddComment = async (payload: reelAddCommentPayload) => {
  const response = await axiosInstance.post(
    "/api/reel_subcomment_add_reply",
    payload
  );
  return response.data;
};

// Comment Like Reel :---
export const commentLikeReel = async (payload: commentLikeReelPayload) => {
  const response = await axiosInstance.post("/api/comment_like_reel", payload);
  return response.data;
};

// Reel Add Subcomment :---
export const reelAddSubcomment = async (payload: reelAddSubcommentPayload) => {
  const response = await axiosInstance.post(
    "/api/reel_add_subcomment",
    payload
  );
  return response.data;
};

// SubComment Like Reel :---
export const subCommentLikeReel = async (
  payload: subCommentLikeReelPayload
) => {
  const response = await axiosInstance.post(
    "/api/sub_comment_like_reel",
    payload
  );
  return response.data;
};

// Bookmark Post :---
export const bookmarkPost = async (payload: bookmarkPostPayload) => {
  const response = await axiosInstance.post("/api/bookmark_post", payload);
  return response.data;
};

// Save Post :---
export const savePost = async (payload: savePostPayload) => {
  const response = await axiosInstance.post("/api/save_post", payload);
  return response.data;
};

// Post On Comment :---
export const postOnComment = async (payload: postOnCommentPayload) => {
  const response = await axiosInstance.post("/api/post_on_comment", payload);
  return response.data;
};

// Reel on Comment :---
export const reelOnComment = async (payload: reelOnCommentPayload) => {
  const response = await axiosInstance.post("/api/reel_on_comment", payload);
  return response.data;
};

// Post Reply On Comment :---
export const postReplyOnComment = async (
  payload: postReplyOnCommentPayload
) => {
  const response = await axiosInstance.post(
    "/api/post_reply_on_comment",
    payload
  );
  return response.data;
};

// Reel Reply on Comment :---
export const reelReplyOnComment = async (
  payload: reelReplyOnCommentPayload
) => {
  const response = await axiosInstance.post(
    "/api/reel_reply_on_comment",
    payload
  );
  return response.data;
};

// All My Post Pagination :---
export const allMyPostPagination = async (
  payload: allMyPostPaginationPayload
) => {
  const response = await axiosInstance.post(
    "/api/all_my_post_pagination",
    payload
  );
  return response.data;
};

// All My Tag Post Pagination :---
export const allMyTagPostPagination = async (
  payload: allMyTagPostPaginationPayload
) => {
  const response = await axiosInstance.post(
    "/api/all_my_tag_post_pagination",
    payload
  );
  return response.data;
};

// Second User All Post Pagiination :---
export const secondUserAllPostPagination = async (
  payload: secondUserAllPostPaginationPayload
) => {
  const response = await axiosInstance.post(
    "/api/second_user_all_post_pagination",
    payload
  );
  return response.data;
};

// Second User Tag Post Pagination :---
export const secondUserTagPostPagination = async (
  payload: secondUserTagPostPaginationPayload
) => {
  const response = await axiosInstance.post(
    "/api/second_user_tag_post_pagination",
    payload
  );
  return response.data;
};

// Second User All Post :---
export const secondUserAllPost = async (payload: secondUserAllPostPayload) => {
  const response = await axiosInstance.post(
    "/api/second_user_all_post",
    payload
  );
  return response.data;
};

// All My Tag Post :---
export const allMyTagPost = async (payload: allMyTagPostPayload) => {
  const response = await axiosInstance.post("/api/all_my_tag_post", payload);
  return response.data;
};

// All Tag Post User :---
export const allTagPostUser = async (payload: allTagPostUserPayload) => {
  const response = await axiosInstance.post("/api/all_tag_post_user", payload);
  return response.data;
};

// Second User Tag Post :---
export const secondUserTagPost = async (payload: secondUserTagPostPayload) => {
  const response = await axiosInstance.post(
    "/api/second_user_tag_post",
    payload
  );
  return response.data;
};

// Second User All Post And Reel :---
export const secondUserAllPostAndReel = async (
  payload: secondUserAllPostAndReelPayload
) => {
  const response = await axiosInstance.post(
    "/api/second_user_all_post_and_reel",
    payload
  );
  return response.data;
};

// reply Like Reel :---
export const replyLikeReel = async (payload: replyLikeReelPayload) => {
  const response = await axiosInstance.post("/api/reply_like_reel", payload);
  return response.data;
};

// Add Reel :---
export const addReel = async (payload: addReelPayload) => {
  const response = await axiosInstance.post("/api/add_reel", payload);
  return response.data;
};

// get Reel Details :---
export const getReelDetails = async (payload: getReelDetailsPayload) => {
  const response = await axiosInstance.post("/api/get_reel_details", payload);
  return response.data;
};

// Like Reel :---
export const likeReel = async (payload: likeReelPayload) => {
  const response = await axiosInstance.post("/api/like_reel", payload);
  return response.data;
};


// Reel Add Report :---
export const reelAddReport = async (payload: reelAddReportPayload) => {
  const response = await axiosInstance.post("/api/reel_add_report", payload);
  return response.data;
};

// all My Reel Pagination :---
export const allMyReelPagination = async (payload: allMyReelPaginationPayload) => {
  const response = await axiosInstance.post("/api/all_my_reel_pagination", payload);
  return response.data;
};

// second User All Reel Pagination :---
export const secondUserAllReelPagination = async (payload: secondUserAllReelPaginationPayload) => {
  const response = await axiosInstance.post("/api/second_user_all_reel_pagination", payload);
  return response.data;
};

// second User All Reel  :---
export const secondUserAllReel = async (payload: secondUserAllReelPayload) => {
  const response = await axiosInstance.post("/api/second_user_all_reel", payload);
  return response.data;
};


// Reel Add Report :---
export const allMyReel = async () => {
  const response = await axiosInstance.post("/api/all_my_reel");
  return response.data;
};


// get All Reels Data :---
export const getAllReelsData = async () => {
  const response = await axiosInstance.post("/api/get_all_reels_datainshow");
  return response.data;
};


// get Hashtags List :---
export const getHashtagsList = async () => {
  const response = await axiosInstance.post("/api/get_hashtags_list");
  return response.data;
};


// my Reel like List :---
export const myReelLikeList = async () => {
  const response = await axiosInstance.post("/api/my_reel_like_list");
  return response.data;
};



// get All Music :---
export const getAllMusic = async () => {
  const response = await axiosInstance.post("/api/get_all_music");
  return response.data;
};



// Bookmark Post List :---
export const bookmarkPostList = async () => {
  const response = await axiosInstance.post("/api/bookmark_post_list");
  return response.data;
};




// Get All Latest Reel and Post :---
export const getAllLatestReelAndPost = async () => {
  const response = await axiosInstance.post("/api/get_all_latest_reel_and_post_pagination");
  return response.data;
};




// All My Post :---
export const allMyPost = async () => {
  const response = await axiosInstance.post("/api/all_my_post");
  return response.data;
};





