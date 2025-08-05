// import { useUserStore, useUserLoginStore } from "@/store/userstore/userStore";
import { userProfile } from "services/api/user/userServices";
import { useUserLoginStore, useUserStore } from "./userStore";

export const fetchAndStoreUser = async () => {
  try {
    const { userDetails } = useUserLoginStore.getState();
    if (!useUserLoginStore?.user_id) throw new Error("User ID missing");

    const payload = { to_user_id: useUserLoginStore?.user_id };
    const res = await userProfile(payload);

    if (res?.user_data) {
      useUserStore.getState().setUser(res.user_data);
    } else {
      throw new Error("User data missing in response");
    }

    return res.user_data;
  } catch (error) {
    console.error("❌ Failed to fetch user profile:", error);
    throw error;
  }
};
