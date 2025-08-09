export interface myPostCommentListPayload {
  post_id: number;
}

export interface myPostCommentLikeListPayload {
  post_id: number;
  post_comment_id: number;
}

export interface myPostSubcommentLikeListPayload {
  post_id: number;
  post_sub_comment_id: number;
}

export interface myPostReplyLikeListPayload {
  post_id: number;
  post_reply_id: string;
}

export interface getAllLatestReelByPaginationPayload {
  page_no: number;
  per_page: number;
}

export interface addPostPayload {
  content: string;
}

export interface getPostDetailsPayload {
  post_id: string;
}

export interface likePostPayload {
  post_id: number;
}

export interface commentLikePostPayload {
  post_id: number;
  post_comment_id: number;
}

export interface postAddSubcommentPayload {
  post_id: number;
  post_comment_id: number;
  text: string;
}

export interface subCommentLikePostPayload {
  post_id: number;
  post_sub_comment_id: number;
}

export interface postAddReportPayload {
  post_id: number;
  report_text_id: number;
}

export interface getHashtagsPostPayload {
  hashtag: string;
}

export interface myPostLikeListPayload {
  post_id: number;
}

export interface getAllLatestReelAndPostsPayload {
  page_no: number;
  per_page: number;
}

export interface postAddCommentPayload {
  post_id: number;
  text: string;
}

export interface postSubcommentAddReplyPayload {
  post_comment_id: number;
  post_subcomment_id: number;
  text: string;
}

export interface reelSubcommentAddReplyPayload {
  reel_comment_id: number;
  reel_subcomment_id: number;
  text: string;
}

export interface replyLikePostPayload {
  post_subcomment_id: number;
  post_reply_id: number;
}

export interface reelAddCommentPayload {
  reel_id: number;
  text: string;
}

export interface commentLikeReelPayload {
  reel_id: string;
  reel_comment_id: string;
}

export interface reelAddSubcommentPayload {
  reel_id: string;
  reel_comment_id: string;
  text: string;
}

export interface subCommentLikeReelPayload {
  reel_id: string;
  reel_sub_comment_id: string;
}

export interface bookmarkPostPayload {
  post_id: string;
  type: string;
}

export interface savePostPayload {
  post_id: number;
}

export interface postOnCommentPayload {
  post_id: number;
  page_no: number;
}

export interface reelOnCommentPayload {
  reel_id: number;
  page_no: number;
}

export interface postReplyOnCommentPayload {
  post_subcomment_id: number;
  post_comment_id: number;
  page_no: number;
}

export interface reelReplyOnCommentPayload {
  reel_subcomment_id: number;
  reel_comment_id: number;
  page_no: number;
}

export interface allMyPostPaginationPayload {
  page_no: number;
  per_page: number;
}

export interface allMyTagPostPaginationPayload {
  page_no: number;
  per_page: number;
}

export interface secondUserAllPostPaginationPayload {
  page_no: number;
  per_page: number;
}

export interface secondUserTagPostPaginationPayload {
  page_no: number;
  per_page: number;
}

export interface secondUserAllPostPayload {
  to_user_id: number;
}

export interface allMyTagPostPayload {
  to_user_id: number;
}

export interface allTagPostUserPayload {
  post_id: number;
}

export interface secondUserTagPostPayload {
  to_user_id: number;
}

export interface secondUserAllPostAndReelPayload {
  to_user_id: number;
}

export interface replyLikeReelPayload {
  reel_subcomment_id: number;
  reel_reply_id: number;
}

export interface addReelPayload {
  video_url: string;
}

export interface getReelDetailsPayload {
  reel_id: number;
}

export interface likeReelPayload {
  reel_id: number;
}

export interface reelAddReportPayload {
  reel_id:string;
  report_text_id:string;
}

export interface allMyReelPaginationPayload {
  page_no:number;
  per_page:number;
}

export interface secondUserAllReelPaginationPayload {
  page_no:number;
  per_page: number;
}

export interface secondUserAllReelPayload {
  to_user_id:number;
  reel_id: string;
  report_text_id: string;
}
