"use client";

import { AtSign, Eye, EyeClosed, Lock, User, X } from "lucide-react";
import styles from "./registration.module.css";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Registration() {
 const [visible, setVisible] = useState(false);
 const [confirmVisible, setConfirmVisible] = useState(false);

 const handleVisible = () => {
  setVisible(!visible);
 };

 const handleConfirmVIsible = () => {
  setConfirmVisible(!confirmVisible);
 };

 return (
  <div className={styles.registration}>
   <div className={styles["registration-wrapper"]}>
    <div className={styles["registration-header"]}>
     <div className={styles.hero}>
      <div className={styles["logo-wrapper"]}>
       <Image src={"/Logo.png"} alt="Logo" width={512} height={512} />
      </div>
      <h2>SIMS PPOB</h2>
     </div>
     <div className={styles["welcome-text"]}>
      <h2>
       Lengkapi data untuk <br />
       membuat akun
      </h2>
     </div>
    </div>
    <div className={styles["registration-form"]}>
     <label htmlFor="email" className={`${styles["input"]} ${styles.email}`}>
      <div className={styles["input-wrapper"]}>
       <AtSign size={18} />
       <input
        type="email"
        name="email"
        id="email"
        placeholder="masukkan email anda"
       />
      </div>
      {
       <small className={styles["validation-info"]}>
        Email sudah terdaftar
       </small>
      }
     </label>
     <label
      htmlFor="surname"
      className={`${styles["input"]} ${styles.surname}`}
     >
      <div className={styles["input-wrapper"]}>
       <User size={18} />
       <input
        type="text"
        name="surname"
        id="surname"
        placeholder="nama depan"
       />
      </div>
      {
       <small className={styles["validation-info"]}>
        Email sudah terdaftar
       </small>
      }
     </label>
     <label
      htmlFor="last-name"
      className={`${styles["input"]} ${styles["last-name"]}`}
     >
      <div className={styles["input-wrapper"]}>
       <User size={18} />
       <input
        type="text"
        name="last-name"
        id="last-name"
        placeholder="nama belakang"
       />
      </div>
      {
       <small className={styles["validation-info"]}>
        Email sudah terdaftar
       </small>
      }
     </label>
     <label
      htmlFor="password"
      className={`${styles["input"]} ${styles.password}`}
     >
      <div className={styles["input-wrapper"]}>
       <Lock size={18} />
       <input
        type={visible ? "text" : "password"}
        name="password"
        id="password"
        placeholder="buat password"
       />
       {visible ? (
        <Eye onClick={handleVisible} size={18} />
       ) : (
        <EyeClosed onClick={handleVisible} size={18} />
       )}
      </div>
      {
       <small className={styles["validation-info"]}>
        Email sudah terdaftar
       </small>
      }
     </label>
     <label
      htmlFor="confirm-password"
      className={`${styles["input"]} ${styles["confirm-password"]}`}
     >
      <div className={styles["input-wrapper"]}>
       <Lock size={18} />
       <input
        type={confirmVisible ? "text" : "password"}
        name="confirm-password"
        id="confirm-password"
        placeholder="konfirmasi password"
       />
       {confirmVisible ? (
        <Eye onClick={handleConfirmVIsible} size={18} />
       ) : (
        <EyeClosed onClick={handleConfirmVIsible} size={18} />
       )}
      </div>
      {
       <small className={styles["validation-info"]}>
        Email sudah terdaftar
       </small>
      }
     </label>
    </div>
    <div className={styles["action-wrapper"]}>
     <button className={styles.submit}>Registrasi</button>
     <div>
      <span>sudah punya akun? login </span>
      <Link href={"/login"} className={styles.login}>
       di sini
      </Link>
     </div>
    </div>
   </div>
  </div>
 );
}
