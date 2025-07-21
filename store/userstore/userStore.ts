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

interface UserStore {
  user: UserProfile | null;
  setUser: (data: UserProfile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => {
        console.log("✅ USER STORED IN ZUSTAND:", data); // ✅ log
        set({ user: data });
      },
      clearUser: () => {
        console.log("🧹 USER CLEARED FROM ZUSTAND");
        set({ user: null });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
