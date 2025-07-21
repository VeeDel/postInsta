
export interface addStoryPayload {
  url: string;
  video: string;
  video_thumbnail: string;
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
  cover_pic:string;
  story_id:string;
  title:string;
}

export interface storySeenListPayload {
    stroy_id:string;
}

export interface myStoryDeletePayload {
    stroy_id:string;
}

export interface updatePaymentGatewayPayload {
  id: string;
  text: string;
  public_key:string;
  secret_key:string;
  mode:string;
  status:string;
  country_code:string;
  currency_code:string;
}
