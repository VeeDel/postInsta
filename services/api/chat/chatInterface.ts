export interface sendChatMessagePayload {
  to_user: number;
  message: string;
  type: string;
  url: File | string;
  video_thumbnail: File | string;
  post_id: string;
  reel_id: string;
  stroy_id: string;
}

export interface getMessageListPayload {
  to_user: string | null;
}

export interface newChatApiPayload {
  to_user: string;
  event_name: string;
  message: string;
  type: string;
  url: File | string;
  video_thumbnail: string;
  post_id: string;
  reel_id: string;
  story_id: string;
}

export interface newUserChatListPayload {
  socket_id: string;
}

export interface newMessageListPayload {
  to_user: string;
  socket_id: string;
}
