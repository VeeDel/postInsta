"use client";

import Layout from "@/components/Layout";
import Profile from "@/components/Profile";
import { posts } from "@/mocks/posts";
import { media } from "@/mocks/media";
import { userProfilePayload } from "services/api/user/userInterface";
import { userProfile } from "services/api/user/userServices";
import { useEffect, useState } from "react";
import { useUserLoginStore, useUserStore } from "@/store/userstore/userStore";
import { getAllLatestPost } from "services/api/post/postServices";

const ProfileScreen = () => {
  // zustang imports:-----
  const { userDetails } = useUserLoginStore();
  // usestate imports:-----
  const { setUser, user } = useUserStore();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async (userId) => {
    try {
      setLoading(true);
      const payload = { to_user_id: userId };
      const res = await userProfile(payload);
      console.log(res);

      setUser(res?.user_data);
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
      const userId = userDetails?.user_id;
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

// "use client";

// import Layout from "@/components/Layout";
// import Profile from "@/components/Profile";
// import { posts } from "@/mocks/posts";
// import { media } from "@/mocks/media";
// // Remove imports not needed for profile state
// import { useEffect, useState } from "react";
// import { useUserLoginStore } from "@/store/userstore/userStore";
// // Import your new store!
// // import { useProfileStore } from "@/store/profileStore";
// import { getAllLatestPost } from "services/api/post/postServices";
// import { useProfileStore } from "@/store/userstore/profileStore";

// const ProfileScreen = () => {
//   // Get login info and profile store
//   const { userDetails } = useUserLoginStore();
//   const { profile, loading, error, fetchProfile } = useProfileStore();
//   // Posts can stay in local state
//   const [userPosts, setUserPosts] = useState([]);

//   // Fetch posts as before
//   const getAllPosts = async () => {
//     try {
//       const res = await getAllLatestPost();
//       setUserPosts(res?.data?.rescent_post || []);
//     } catch (error) {
//       console.error("Posts fetch error:", error);
//       // Post fetch errors are not shown, keep as-is
//     }
//   };

//   // On mount: fetch profile THEN posts
//   useEffect(() => {
//     if (userDetails?.user_id) {
//       fetchProfile(userDetails.user_id);
//     }
//   }, [userDetails?.user_id, fetchProfile]);

//   // When profile is ready, load posts
//   useEffect(() => {
//     if (profile) {
//       getAllPosts();
//     }
//   }, [profile]);

//   // Loading/error using global store state
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   if (!profile) {
//     return <div>No user data available</div>;
//   }

//   return (
//     <Layout rightSidebar rightSidebarActiveTrending>
//       <Profile
//         background="/images/background-1.jpg"
//         avatar={profile?.profile_pic}
//         name={`${profile?.first_name} ${profile?.last_name}`}
//         login={profile?.username ?? "User"}
//         link="https://linktr.ee/jonDoe"
//         followers={profile?.followers ?? ""}
//         posts={userPosts}
//         postFeatured={[userPosts[1], userPosts[3], userPosts[2]]}
//         media={media}
//         isFollowing={false}
//         own
//         bio={profile?.bio ?? ""}
//       />
//     </Layout>
//   );
// };

// export default ProfileScreen;
