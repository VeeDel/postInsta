import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  login_type: string;
  username: string;
  mobile: string;
  country_code: string;
  device_token: string;
  role: string;
  profile_pic: any;
  address: string;
  bio: string;
  dob: string;
  gender: string;
  avtar_id: string;
  followers: string;
  following: string;
  is_followers: string;
  is_user_following_me: string;
  is_block: string;
  total_posts: string;
  total_reels: string;
  total_tags: string;
  platform_type: string;
  country: string;
}

export interface LoginResponse {
  response_code: string;
  status: string;
  message: string;
  mobile: string;
  country_code: string;
  username: string;
  first_name: string;
  last_name: string;
  user_id: string;
  avtar_id: string;
  token: string;
  profile_pic: string;
  account_status: number;
}

interface UserStore {
  user: UserProfile | null;
  setUser: (data: UserProfile) => void;
  clearUser: () => void;
}
interface OtherPersonStore {
  profile: UserProfile | null;
  setUser: (data: UserProfile) => void;
  clearUser: () => void;
}

interface UserDetailsStore {
  userDetails: LoginResponse | null;
  setUserDetails: (data: LoginResponse) => void;
  clearUserDetails: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => {
        console.log("✅ FULL USER PROFILE STORED:", data);
        set({ user: data });
      },
      clearUser: () => {
        console.log("🧹 USER PROFILE CLEARED");
        set({ user: null });
      },
    }),
    {
      name: "user-profile-storage", // ✅ unique key
    }
  )
);
export const useOtherPersonStore = create<OtherPersonStore>()(
  persist(
    (set) => ({
      profile: null,
      setUser: (data) => {
        console.log("✅ FULL USER PROFILE STORED:", data);
        set({ profile: data });
      },
      clearUser: () => {
        console.log("🧹 USER PROFILE CLEARED");
        set({ profile: null });
      },
    }),
    {
      name: "user-profile-storage", // ✅ unique key
    }
  )
);

export const useUserLoginStore = create<UserDetailsStore>()(
  persist(
    (set) => ({
      userDetails: null,
      setUserDetails: (data) => {
        console.log("✅ LOGIN RESPONSE STORED:", data);
        set({ userDetails: data });
      },
      clearUserDetails: () => {
        console.log("🧹 LOGIN RESPONSE CLEARED");
        set({ userDetails: null });
      },
    }),
    {
      name: "user-login-details", // ✅ unique key
    }
  )
);
