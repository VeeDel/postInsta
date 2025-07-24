export interface SendChatMessage {
  to_user: string;
  messages: string;
  type: string;
  uri: string;
  video_thumbnail: string;
  post_id: string;
  reel_id: string;
  stroy_id: string;
}
export interface GetMessageType {
  id: number;
  from_user: number;
  to_user: string;
  message: string;
  url: string;
  video_thumbnail: string;
  type: string;
  post_id: string;
  reel_id: string;
  story_id: string;
  send_post: string;
  send_story: string;
  created_at: string;
  first_name: string;
  profile_pic: string;
  post_user_id: string;
  post_user_name: string;
  post_user_profile_pic: string;
  chat_time: string;
}
export interface Chatlist {
  id: string;
  my_id: string;
  second_id: string;
  message_type: string;
  message: string;
  url: string;
  type: string;
  user_id: string;
  first_name: string;
  role: string;
  profile_pic: string;
  last_seen: string;
  date: string;
  time: string;
  unread_message: string;
}

export interface GetMessageList {
  to_user: string;
}
