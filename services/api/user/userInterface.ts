export interface updateUserProfilePayload {
  first_name: string;
  last_name: string | null;
  email: string;
  username: string;
  bio: string;
  gender?: string;
  profile_pic?: File | null;
  background_image: File;
}

export interface userProfilePayload {
  to_user_id: string;
}

export interface profileBlockedPayload {
  block_user_id:string;
  to_user_id: string;
}

export interface usernameCheckPayload {
  username: string;
}

export interface userAddReportPayload {
  to_user_id:number;
  report_text_id:number;
  post_id:number;
  type:string;
}

