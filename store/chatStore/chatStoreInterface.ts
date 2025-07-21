export interface SendChatMessage {
    to_user: string;
    messages:string;
    type: string;
    uri: string;
    video_thumbnail: string;
    post_id:string;
    reel_id: string;
    stroy_id:string;
}

export interface GetMessageList {
    to_user: string;
}