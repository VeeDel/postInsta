
export interface addStoryPayload {
  url: File;
  video: File;
  video_thumbnail: File;
  type: string;
  location: string;
  text: string;
}

export interface deleteStoryPayload {
  story_id: string;
}

export interface viewStoryPayload {
  story_id: string;
}

export interface likeStoryPayload {
  story_id: string;
}

export interface addStoryHighlightPayload {
  cover_pic:File;
  story_id:string;
  title:string;
}

export interface storySeenListPayload {
    stroy_id:string;
}

export interface myStoryDeletePayload {
    stroy_id:string;
}



export interface secondUserStoryHighlightPayload {
  to_user_id:string;
}