"use client";

import { fetchBalance } from "@/redux/slices/balanceSlice";
import styles from "./userSection.module.css";
import { fetchProfile } from "@/redux/slices/profileSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserSection() {
 const dispatch = useDispatch();
 const [visibility, setVisibility] = useState(false);

 const { user, loading, error } = useSelector((state) => state.profile);
 const {
  balance,
  loading: balanceLoading,
  error: balanceError,
 } = useSelector((state) => state.balance);

 const visibilityHandle = () => {
  setVisibility(!visibility);
 };

 useEffect(() => {
  dispatch(fetchProfile());
  dispatch(fetchBalance());
 }, [dispatch]);

 if (loading) {
  return <p>loading...</p>;
 }

 return (
  <section className={styles["user-section"]}>
   <div className={styles["user-profile"]}>
    <div className={styles["profile-picture"]}>
     <Image
      src={user.profile_image}
      alt="profile-picture"
      width={70}
      height={70}
     />
    </div>
    <div className={styles["user-name"]}>
     <p>Selamat datang,</p>
     <h3>{`${user.first_name} ${user.last_name}`}</h3>
    </div>
   </div>
   <div className={styles["user-balance"]}>
    <p>Saldo anda</p>
    <div className={styles.balance}>
     <span>Rp</span>
     {visibility ? (
      balance.balance.toLocaleString("id-ID")
     ) : (
      <div className={styles["not-visible"]}>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
       <span></span>
      </div>
     )}
    </div>
    <button onClick={visibilityHandle} className={styles["visibility-button"]}>
     {visibility ? "Tutup Saldo" : "Lihat Saldo"}
    </button>
   </div>
  </section>
 );
}

export default UserSection;
