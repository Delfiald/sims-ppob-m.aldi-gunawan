"use client";

import { AtSign, Eye, EyeClosed, Lock, X } from "lucide-react";
import styles from "./login.module.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/slices/loginSlice";
import { useRouter } from "next/navigation";

export default function Login() {
 const dispatch = useDispatch();
 const router = useRouter();
 const { token, loading, error } = useSelector((state) => state.login);

 const [formData, setFormData] = useState({
  email: "",
  password: "",
 });

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleLogin = () => {
  dispatch({ type: "login/resetError" });
  dispatch(loginUser(formData));
 };

 const [visible, setVisible] = useState(false);

 const handleVisible = () => {
  setVisible(!visible);
 };

 useEffect(() => {
  if (token) {
   router.replace("/");
  }
 }, [router, token]);
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
      <div
       className={`${styles["input-wrapper"]} ${error.email && styles.error}`}
      >
       <AtSign size={18} />
       <input
        type="email"
        name="email"
        id="email"
        placeholder="masukkan email anda"
        onChange={handleChange}
       />
      </div>
     </label>
     <label
      htmlFor="password"
      className={`${styles["input"]} ${styles.password}`}
     >
      <div
       className={`${styles["input-wrapper"]} ${
        error.password && styles.error
       }`}
      >
       <Lock size={18} />
       <input
        type={visible ? "text" : "password"}
        name="password"
        id="password"
        placeholder="masukkan password anda"
        onChange={handleChange}
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
     <button onClick={handleLogin} className={styles.submit}>
      Masuk
     </button>
     <div>
      <span>belum punya akun? registrasi </span>
      <Link href={"/registration"} className={styles.registration}>
       di sini
      </Link>
     </div>
    </div>
    {Object.keys(error).length > 0 && (
     <div className={styles.feedback}>
      <p>
       {["email", "password", "general"].find((key) => error[key]) &&
        error[["email", "password", "general"].find((key) => error[key])]}
      </p>
      <div
       onClick={() => dispatch({ type: "login/resetError" })}
       className={styles.close}
      >
       <X size={16} />
      </div>
     </div>
    )}
   </div>
  </div>
 );
}
