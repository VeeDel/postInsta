"use client";

import Layout from "@/components/Layout";
import Profile from "@/components/Profile";

import { users } from "@/mocks/users";
import { posts } from "@/mocks/posts";
import { media } from "@/mocks/media";
import { userProfile } from "services/api/user/userServices";
import { useEffect, useState } from "react";
import { useOtherPersonStore } from "@/store/userstore/userStore";
import { secondUserAllPost } from "services/api/post/postServices";

const PostScreen = ({ userId }: { userId: string }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { setUser, profile } = useOtherPersonStore();
  const getUserProfileData = async () => {
    try {
      const payload = { to_user_id: userId };
      const res = await userProfile(payload);
      console.log(res);
      setUser(res.user_data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetUserPost = async () => {
    try {
      const payload = { to_user_id: userId };
      const response = await secondUserAllPost(payload);
      console.log(response);
      setUserPosts(response?.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProfileData();
      GetUserPost();
    }
  }, [userId]);

  return profile ? (
    <Layout rightSidebar>
      <Profile
        bio={profile?.bio}
        background="/images/background.jpg"
        avatar={profile.profile_pic}
        name={profile.first_name}
        login={profile?.username ?? "User"}
        link="https://linktr.ee/jonDoe"
        followers={profile.followers ?? ""}
        posts={userPosts}
        postFeatured={
          userPosts?.length > 5 ? [posts[5], posts[3], posts[2]] : []
        }
        media={media}
        isFollowing={Number(profile.is_user_following_me) > 0}
      />
    </Layout>
  ) : null;
};

export default PostScreen;
