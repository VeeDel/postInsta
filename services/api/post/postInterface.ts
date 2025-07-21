export interface myPostCommentListPayload {
  post_id: string;
  post_comment_id: string;
}

export interface myPostCommentLikeListPayload {
  post_id: string;
  post_comment_id: string;
}

export interface myPostSubcommentLikeListPayload {
  post_id: string;
  post_sub_comment_id: string;
}

export interface myPostReplyLikeListPayload {
  post_id: string;
  post_reply_id: string;
}

export interface getAllLatestReelByPaginationPayload {
  page_no: string;
  per_page: string;
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
  comment_id: string;
}

export interface postAddSubcommentPayload {
  comment_id: string;
  reply: string;
}

export interface subCommentLikePostPayload {
  sub_comment_id: string;
}

export interface postAddReportPayload {
  post_id: string;
  reason: string;
}

export interface getHashtagsPostPayload {
  hashtag: string;
}
