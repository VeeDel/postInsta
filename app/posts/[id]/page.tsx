import PostScreen from "@/screens/PostScreen";

const Post = ({ params }: { params: { id: string } }) => {
    return <PostScreen postId={params.id} />;
};

export default Post;
