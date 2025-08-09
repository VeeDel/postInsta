import toast from "react-hot-toast";
import { profileBlocked } from "services/api/user/userServices";
interface blockuser {
  blockUserId: string;
  toUserId: string;
}
export const blockUser = async ({ blockUserId, toUserId }: blockuser) => {
  const payload = {
    block_user_id: blockUserId,
    to_user_id: toUserId,
  };
  try {
    const res = await profileBlocked(payload);
    toast.success(res?.message);
    return true;
  } catch (error) {
    console.error(error);
    toast.error("Failed to block user");
    return false;
  }
};
