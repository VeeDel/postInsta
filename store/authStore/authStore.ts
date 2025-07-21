// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        console.log("✅ Token set:", token);
        set({ token });
      },
      clearToken: () => {
        console.log("🧹 Token cleared");
        set({ token: null });
      },
    }),
    {
      name: "auth-token", // Stored
    }
  )
);
