import UserScreen from "@/screens/UserScreen";

const Profile = ({ params }: { params: { id: string } }) => {
    return <UserScreen userId={params.id} />;
};

export default Profile;
