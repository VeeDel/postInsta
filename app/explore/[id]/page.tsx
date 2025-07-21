import TopicScreen from "@/screens/TopicScreen";

const Topic = ({ params }: { params: { id: string } }) => {
    return <TopicScreen topicId={params.id} />;
};

export default Topic;
