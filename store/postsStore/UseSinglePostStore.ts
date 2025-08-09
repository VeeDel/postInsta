import { getPostDetails } from "services/api/post/postServices";
import { timeAgo } from "services/utils/dateAndTimeUtils";
import { create } from "zustand";
// import { getPostDetails } from "@/services/api/post/postServices";
// import { timeAgo } from "@/services/utils/dateAndTimeUtils";

const formatPostData = (data: any) => ({
  avatar: data.profile_pic || "/images/default-avatar.png",
  bookmark: data.is_bookmark === "1",
  comments: Number(data.total_comment),
  content: data.text,
  following: data.is_follow === "1",
  id: data.post_id.toString(),
  image: data?.image || null,
  video: data?.video || null,
  likes: {
    count: Number(data.total_like),
    liked: data.is_liked === "1",
  },
  name: data.username,
  reposts: {
    count: Number(data.total_share),
    reposted: false,
  },
  time: timeAgo(data.created_at),
});

export const usePostStore = create((set, get) => ({
  posts: {}, // { postId: postData }
  loading: false,
  error: null,

  fetchPost: async (postId: string) => {
    const existing = get().posts[postId];
    if (existing) {
      // Stale-while-revalidate: update in background
      get().refreshPost(postId);
      return existing;
    }
    return await get().refreshPost(postId);
  },

  refreshPost: async (postId: string) => {
    try {
      set({ loading: true, error: null });
      const res = await getPostDetails({ post_id: postId });
      const data = res?.data?.post_details;
      if (!data) return null;

      const formattedPost = formatPostData(data);
      set((state) => ({
        posts: { ...state.posts, [postId]: formattedPost },
        loading: false,
      }));
      return formattedPost;
    } catch (error) {
      console.error("Fetch post error:", error);
      set({ loading: false, error: "Failed to load post" });
      return null;
    }
  },
}));
