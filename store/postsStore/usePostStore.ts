// store/usePostsStore.ts
import { getAllLatestPost } from "services/api/post/postServices";
import { create } from "zustand";

type Post = any; // Replace with your actual Post type

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
};

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getAllLatestPost();
      set({
        posts: res?.data?.rescent_post || [],
        loading: false,
      });
    } catch (err) {
      console.error("Posts fetch error:", err);
      set({ error: "Failed to load posts", loading: false });
    }
  },
}));
