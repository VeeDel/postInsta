export interface updateUserProfilePayload {
  user_id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  username: string;
  bio: string;
  gender?: string;
  avtar_id?: string;
  profile_pic?: File | null;
}

export interface userProfilePayload {
  to_user_id: string;
}
