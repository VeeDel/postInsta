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
    (set, get) => ({
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
      name: "auth-token", // localStorage key
      // Optional: Add storage configuration
      storage: {
        getItem: (name) => {
          try {
            const value = localStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error("Failed to save to localStorage:", error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error("Failed to remove from localStorage:", error);
          }
        },
      },
    }
  )
);
