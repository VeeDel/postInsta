
export interface sendChatMessagePayload {
    to_user: string;
    messages:string;
    type: string;
    uri: string;
    video_thumbnail: string;
    post_id:string;
    reel_id: string;
    stroy_id:string;
}

export interface getMessageListPayload {
    to_user:string;
}

