"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import ScrollMask from "@/components/ScrollMask";
import Post from "@/components/Post";
import Replies from "@/components/Replies";
import NewPost from "@/components/NewPost";
import styles from "./PostScreen.module.sass";

import { posts as mockPosts } from "@/mocks/posts";
import { usePostStore } from "@/store/postsStore/UseSinglePostStore";
// import { usePostStore } from "@/stores/postStore";

const PostScreen = ({ postId }: { postId: string }) => {
  const [maxView, setMaxView] = useState(false);
  const [newPost, setNewPost] = useState("");

  const router = useRouter();
  const { posts, fetchPost, loading, error } = usePostStore();
  const post = posts[postId];

  useEffect(() => {
    fetchPost(postId);
  }, [postId, fetchPost]);

  if (loading && !post) return <div>Loading post...</div>;
  if (error && !post) return <div>Error: {error}</div>;

  return post ? (
    <Layout rightSidebar={!maxView} hideNavigation>
      <div className={cn(styles.main, { [styles.mainMaxView]: maxView })}>
        <div className={styles.head}>
          <button
            className={cn("button-circle", styles.button)}
            onClick={() => router.back()}
          >
            <Icon name="arrow-left" />
          </button>
          <button
            className={cn("button-circle", styles.buttonView)}
            onClick={() => setMaxView(!maxView)}
          >
            <Icon name={maxView ? "minimize" : "resize"} />
          </button>
        </div>

        {maxView ? (
          <div className={styles.row}>
            <ScrollMask className={styles.col}>
              <Post className={styles.post} item={post} isNotLink />
            </ScrollMask>
            <div className={styles.col}>
              <NewPost
                className={styles.new}
                content={newPost}
                setContent={setNewPost}
                bodyLeft
                reply
                autoFocus
              />
              <ScrollMask className={styles.group}>
                <Replies />
                <Post item={mockPosts[4]} />
                <Post item={mockPosts[0]} actionsBodyUp />
              </ScrollMask>
            </div>
          </div>
        ) : (
          <div className={styles.body}>
            <ScrollMask className={styles.wrap}>
              <div className={styles.list}>
                <Post className={styles.post} item={post} isNotLink />
                <Replies />
                <Post item={mockPosts[2]} />
                <Post item={mockPosts[0]} actionsBodyUp />
              </div>
            </ScrollMask>
            <NewPost
              className={styles.new}
              classAddMedia={styles.addMedia}
              classBodyAddMedia={styles.bodyAddMedia}
              content={newPost}
              setContent={setNewPost}
              bodyUp
              reply
              autoFocus
            />
          </div>
        )}
      </div>
    </Layout>
  ) : null;
};

export default PostScreen;
