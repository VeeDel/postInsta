import { userProfile } from "services/api/user/userServices";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProfileStore = create((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async (userId) => {
    set({ loading: true, error: null });
    try {
      const payload = { to_user_id: userId };
      const res = await userProfile(payload);
      set({ profile: res?.user_data || null });
    } catch (error) {
      set({ error: "Failed to load profile" });
    } finally {
      set({ loading: false });
    }
  },
  clearProfile: () => set({ profile: null, error: null }),
}));
