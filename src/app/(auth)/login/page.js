"use client";

import { AtSign, Eye, EyeClosed, Lock, X } from "lucide-react";
import styles from "./login.module.css";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
 const [visible, setVisible] = useState(false);

 const handleVisible = () => {
  setVisible(!visible);
 };
 return (
  <div className={styles.login}>
   <div className={styles["login-wrapper"]}>
    <div className={styles["login-header"]}>
     <div className={styles.hero}>
      <div className={styles["logo-wrapper"]}>
       <Image src={"/Logo.png"} alt="Logo" width={512} height={512} />
      </div>
      <h2>SIMS PPOB</h2>
     </div>
     <div className={styles["welcome-text"]}>
      <h2>
       Masuk atau buat akun <br />
       untuk memulai
      </h2>
     </div>
    </div>
    <div className={styles["login-form"]}>
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
        placeholder="masukkan password anda"
       />
       {visible ? (
        <Eye onClick={handleVisible} size={18} />
       ) : (
        <EyeClosed onClick={handleVisible} size={18} />
       )}
      </div>
     </label>
    </div>
    <div className={styles["action-wrapper"]}>
     <button className={styles.submit}>Masuk</button>
     <div>
      <span>belum punya akun? registrasi </span>
      <Link href={"/registration"} className={styles.registration}>
       di sini
      </Link>
     </div>
    </div>
    {
     <div className={styles.feedback}>
      <p>password yang anda masukkan salah</p>
      <div className={styles.close}>
       <X size={16} />
      </div>
     </div>
    }
   </div>
  </div>
 );
}
