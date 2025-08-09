import Follower from "@/components/Follower";
import NoBlockedUsers from "./NoBlockedUsers";
import styles from "./BlockedAccounts.module.sass";

import { userBlocklist } from "services/api/other/otherServices";
import { useEffect, useState } from "react";

type BlockedAccountsProps = {};

const BlockedAccounts = ({}: BlockedAccountsProps) => {
  const [blockedUsers, setBlockedUsers] = useState<any[]>([]);

  const fetchBlockedProfiles = async () => {
    try {
      const response = await userBlocklist();
      if (response?.user_blocklist) {
        const transformed = response.user_blocklist.map((item: any) => ({
          ...item,
          avatar: item.profile_pic || "/images/avatar-7.png",
          content: item.bio || "",
          id: item.user_id,
          isFollowing: true, // default true for now
          name:
            item.first_name && item.last_name
              ? `${item.first_name} ${item.last_name}`.trim()
              : "Jaadoe User", // fallback
          online: true, // default
          username: item.username || "JaadoeUser",
        }));
        setBlockedUsers(transformed);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlockedProfiles();
  }, []);

  return blockedUsers.length > 0 ? (
    <div className={styles.accounts}>
      {blockedUsers.map((account) => (
        <Follower item={account} key={account.id} isBlocked />
      ))}
    </div>
  ) : (
    <NoBlockedUsers />
  );
};

export default BlockedAccounts;
