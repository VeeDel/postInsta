"use client";

import { useState, useId, useRef, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Switch from "@/components/Switch";
import Background from "./Background";
import styles from "./ProfileEditScreen.module.sass";
import { updateUserProfile } from "services/api/user/userServices";
import { useUserStore } from "@/store/userstore/userStore";

const ProfileEditScreen = () => {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [privateProfile, setPrivateProfile] = useState(false);
  const [location, setLocation] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idTooltip = useId();

  // Set initial values from user data
  useEffect(() => {
    if (user) {
      setName(user.first_name || "");
      setUsername(user.username || "");
      setBio(user.bio || "");
      setLink("https://linktr.ee/tranmautritam"); // Default or from user data
      setLocation("🌍 Earth"); // Default or from user data
      setPreviewImage(user.profile_pic || null);
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const updateProfile = async () => {
    setIsLoading(true);
    const formData = new FormData();

    // formData.append("user_id", user?.user_id || "");
    formData.append("user_id", "1");
    formData.append("first_name", name);
    formData.append("last_name", user?.last_name || "");
    formData.append("email", user?.email || "");
    formData.append("username", username);
    formData.append("bio", bio);

    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }

    try {
      const res = await updateUserProfile(formData);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout rightSidebar rightSidebarActiveTrending hideNavigation>
      <div className={styles.main}>
        <Background
          onSave={updateProfile}
          isLoading={isLoading}
          onImageChange={handleImageChange}
          triggerFileInput={triggerFileInput}
          previewImage={previewImage}
          fileInputRef={fileInputRef}
        />
        <div className={styles.body}>
          <div className={styles.form}>
            <div className={styles.title}>edit profile</div>
            <div className={styles.field}>
              <div className={styles.label}>
                <Icon name="avatar" /> Name
              </div>
              <div className={styles.wrap}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Display name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <Icon name="at" /> Username
              </div>
              <div className={styles.wrap}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Display username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <Icon name="pencil" /> Bio
              </div>
              <div className={styles.wrap}>
                <textarea
                  className={styles.textarea}
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <Icon name="link" /> Link
              </div>
              <div className={styles.wrap}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Display link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.line}>
              <div className={styles.label}>
                <Icon name="shield" /> Private profile
              </div>
              <div className={styles.box}>
                <Switch
                  className={styles.switch}
                  checked={privateProfile}
                  onChange={() => setPrivateProfile(!privateProfile)}
                />
                <div
                  className={styles.tooltip}
                  data-tooltip-id={idTooltip}
                  data-tooltip-content="Tooltip Private profile"
                  data-tooltip-place="top-end"
                >
                  <Icon name="info" />
                </div>
                <Tooltip id={idTooltip} />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.label}>
                <Icon name="earth" /> Location
              </div>
              <div className={styles.wrap}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Display location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileEditScreen;
