"use client";

import styles from "@/components/UserSection/userSection.module.css";
import Image from "next/image";
import { useState } from "react";

const balance = 10000;

function UserSection() {
 const [visibility, setVisibility] = useState(false);

 const visibilityHandle = () => {
  setVisibility(!visibility);
 };

 return (
  <section className={styles["user-section"]}>
   <div className={styles["user-profile"]}>
    <div className={styles["profile-picture"]}>
     <Image
      src={"/Profile Photo.png"}
      alt="profile-picture"
      width={70}
      height={70}
     />
    </div>
    <div className={styles["user-name"]}>
     <p>Selamat datang,</p>
     <h3>Kristanto Wibowo</h3>
    </div>
   </div>
   <div className={styles["user-balance"]}>
    <p>Saldo anda</p>
    <div className={styles.balance}>
     <span>Rp</span>
     {visibility ? (
      balance.toLocaleString("id-ID")
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
