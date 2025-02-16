"use client";

import { AtSign, Eye, EyeClosed, Lock, User, X } from "lucide-react";
import styles from "./registration.module.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/slices/registerSlice";

export default function Registration() {
 const dispatch = useDispatch();
 const { loading, error } = useSelector((state) => state.register);

 const [formData, setFormData] = useState({
  email: "",
  first_name: "",
  last_name: "",
  password: "",
 });

 const [confirmPassword, setConfirmPassword] = useState("");
 const [confirmError, setConfirmError] = useState(null);

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleConfirmPasswordChange = (e) => {
  setConfirmPassword(e.target.value);
 };
 const [visible, setVisible] = useState(false);
 const [confirmVisible, setConfirmVisible] = useState(false);

 const handleVisible = () => {
  setVisible(!visible);
 };

 const handleConfirmVIsible = () => {
  setConfirmVisible(!confirmVisible);
 };

 const handleRegister = () => {
  dispatch({ type: "register/resetError" });
  if (confirmPassword === formData.password) {
   setConfirmError(null);
   dispatch(registerUser(formData));
  } else {
   setConfirmError("password tidak sama");
  }
 };

 useEffect(() => {
  return () => {
   dispatch({ type: "register/resetError" });
  };
 }, [dispatch]);

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
      {error.email && (
       <small className={styles["validation-info"]}>{error.email}</small>
      )}
     </label>
     <label
      htmlFor="surname"
      className={`${styles["input"]} ${styles.surname}`}
     >
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
        placeholder="nama depan"
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
        placeholder="nama belakang"
        onChange={handleChange}
       />
      </div>
      {error.last_name && (
       <small className={styles["validation-info"]}>{error.last_name}</small>
      )}
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
        placeholder="buat password"
        onChange={handleChange}
       />
       {visible ? (
        <Eye onClick={handleVisible} size={18} />
       ) : (
        <EyeClosed onClick={handleVisible} size={18} />
       )}
      </div>
      {error.password && (
       <small className={styles["validation-info"]}>{error.password}</small>
      )}
     </label>
     <label
      htmlFor="confirm-password"
      className={`${styles["input"]} ${styles["confirm-password"]}`}
     >
      <div
       className={`${styles["input-wrapper"]} ${confirmError && styles.error}`}
      >
       <Lock size={18} />
       <input
        type={confirmVisible ? "text" : "password"}
        name="confirm-password"
        id="confirm-password"
        placeholder="konfirmasi password"
        onChange={handleConfirmPasswordChange}
       />
       {confirmVisible ? (
        <Eye onClick={handleConfirmVIsible} size={18} />
       ) : (
        <EyeClosed onClick={handleConfirmVIsible} size={18} />
       )}
      </div>
      {confirmError && (
       <small className={styles["validation-info"]}>{confirmError}</small>
      )}
     </label>
    </div>
    <div className={styles["action-wrapper"]}>
     <button onClick={handleRegister} className={styles.submit}>
      Registrasi
     </button>
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
