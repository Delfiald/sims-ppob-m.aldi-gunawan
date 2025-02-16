"use client";

import styles from "@/app/account/account.module.css";
import {
 fetchProfile,
 updateProfile,
 updateProfileImage,
} from "@/redux/slices/profileSlice";
import { AtSign, Pencil, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Account() {
 const dispatch = useDispatch();
 const [userData, setUserData] = useState({
  first_name: "",
  last_name: "",
  email: "",
  profile_image: "/Profile Photo.png",
 });

 const [tempUserData, setTempUserData] = useState({
  first_name: "",
  last_name: "",
  email: "",
  profile_image: "/Profile Photo.png",
 });
 const [editable, setEditable] = useState(false);
 const handleChange = (e) => {
  setUserData({ ...userData, [e.target.name]: e.target.value });
 };

 const { user, loading, error } = useSelector((state) => state.profile);

 const handleLogOut = () => {
  dispatch({ type: "login/logout" });
 };

 const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const resultAction = await dispatch(updateProfileImage(file));

  if (updateProfile.fulfilled.match(resultAction)) {
   setUserData({ ...userData, [e.target.name]: e.target.value });
  }
 };

 const handleUpdateProfile = async () => {
  dispatch({ type: "profile/resetError" });
  await dispatch(updateProfile(userData));
 };

 const handleCancelUpdate = () => {
  setUserData(tempUserData);
  setEditable(false);
  dispatch({ type: "profile/resetError" });
 };

 useEffect(() => {
  dispatch(fetchProfile());
 }, [dispatch]);

 useEffect(() => {
  if (user) {
   setUserData(user);
  }
 }, [user]);

 useEffect(() => {
  if (error && Object.keys(error).length > 0) {
   setEditable(true);
  } else {
   setEditable(false);
  }
 }, [error]);

 if (loading) {
  return <p>loading...</p>;
 }

 return (
  <div className={styles.account}>
   <div className={`${styles["input"]} ${styles["profile-picture"]}`}>
    <label htmlFor="profile-picture">
     <Image
      src={userData.profile_image}
      alt="profile-picture"
      width={512}
      height={512}
      priority={true}
     />
     <div className={styles["edit-icon"]}>
      <Pencil size={16} />
     </div>
    </label>
    <input
     type="file"
     name="profile_image"
     id="profile-picture"
     onChange={(e) => handleImageUpdate(e)}
    />
   </div>
   <div
    className={styles.username}
   >{`${userData.first_name} ${userData.last_name}`}</div>
   <div className={styles["profile-form"]}>
    <label htmlFor="email" className={`${styles["input"]} ${styles.email}`}>
     <label htmlFor="email">Email</label>
     <div
      className={`${styles["input-wrapper"]} ${error.email && styles.error}`}
     >
      <AtSign size={18} />
      <input
       type="email"
       name="email"
       id="email"
       disabled={!editable}
       value={userData.email}
       onChange={handleChange}
      />
     </div>
     {error.label && (
      <small className={styles["validation-info"]}>{error.label}</small>
     )}
    </label>
    <label htmlFor="surname" className={`${styles["input"]} ${styles.surname}`}>
     <label htmlFor="surname">Nama Depan</label>
     <div
      className={`${styles["input-wrapper"]} ${
       error.first_name && styles.error
      }`}
     >
      <User size={18} />
      <input
       type="text"
       name="first_name"
       id="surname"
       disabled={!editable}
       value={userData.first_name}
       onChange={handleChange}
      />
     </div>
     {error.first_name && (
      <small className={styles["validation-info"]}>{error.first_name}</small>
     )}
    </label>
    <label
     htmlFor="last-name"
     className={`${styles["input"]} ${styles["last-name"]}`}
    >
     <label htmlFor="last-name">Nama Belakang</label>
     <div
      className={`${styles["input-wrapper"]} ${
       error.last_name && styles.error
      }`}
     >
      <User size={18} />
      <input
       type="text"
       name="last_name"
       id="last-name"
       disabled={!editable}
       value={userData.last_name}
       onChange={handleChange}
      />
     </div>
     {error.last_name && (
      <small className={styles["validation-info"]}>{error.last_name}</small>
     )}
    </label>
    {!editable ? (
     <>
      <button
       onClick={() => {
        setEditable(true);
        setTempUserData(userData);
       }}
       className={styles.edit}
      >
       Edit Profile
      </button>
      <button onClick={handleLogOut} className={styles.logout}>
       Logout
      </button>
     </>
    ) : (
     <>
      <button onClick={handleUpdateProfile} className={styles.submit}>
       Simpan
      </button>
      <button onClick={handleCancelUpdate} className={styles.cancel}>
       Batalkan
      </button>
     </>
    )}
   </div>
  </div>
 );
}
