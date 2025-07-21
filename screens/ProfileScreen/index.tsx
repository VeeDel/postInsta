"use client";

import Layout from "@/components/Layout";
import Profile from "@/components/Profile";
import { posts } from "@/mocks/posts";
import { media } from "@/mocks/media";
import { userProfilePayload } from "services/api/user/userInterface";
import { userProfile } from "services/api/user/userServices";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userstore/userStore";
import { getAllLatestPost } from "services/api/post/postServices";

const ProfileScreen = () => {
  const { setUser, user } = useUserStore();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async (userId) => {
    try {
      setLoading(true);
      const payload = { to_user_id: userId };
      const res = await userProfile(payload);

      setUser(res?.user_data);
      setUserPosts(res?.rescent_post || []);
    } catch (error) {
      console.error("Profile fetch error:", error);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await getAllLatestPost();
      setUserPosts(res?.data?.rescent_post || []);
    } catch (error) {
      console.error("Posts fetch error:", error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      const userId = 2;
      fetchProfile(userId);
    } else {
      getAllPosts();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <Layout rightSidebar rightSidebarActiveTrending>
      <Profile
        background="/images/background-1.jpg"
        avatar={user?.profile_pic}
        name={`${user?.first_name} ${user?.last_name}`}
        login={user?.username ?? "User"}
        link="https://linktr.ee/jonDoe"
        followers={user?.followers ?? ""}
        posts={userPosts}
        postFeatured={[userPosts[1], userPosts[3], userPosts[2]]}
        media={media}
        isFollowing={false}
        own
        bio={user?.bio ?? ""}
      />
    </Layout>
  );
};

export default ProfileScreen;
