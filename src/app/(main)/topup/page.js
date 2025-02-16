"use client";

import Image from "next/image";
import { Banknote, Check, X } from "lucide-react";
import styles from "./topup.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "@/redux/slices/balanceSlice";
import { processTopup } from "@/redux/slices/topupSlice";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import Loading from "@/components/Loading/Loading";

export default function Topup() {
 const dispatch = useDispatch();
 const route = useRouter();
 const [amount, setAmount] = useState(null);
 const [modal, setModal] = useState(null);

 const { topup, loading, error } = useSelector((state) => state.topup);

 const handleChange = (value) => {
  setAmount(value);
 };

 const handleKeyDown = (e) => {
  if (
   !/[0-9]/.test(e.key) &&
   !["Backspace", "ArrowLeft", "ArrowRight"].includes(e.key)
  ) {
   e.preventDefault();
  }
 };

 const handlePurchase = async () => {
  const result = await dispatch(
   processTopup({
    top_up_amount: amount,
   })
  );

  if (processTopup.fulfilled.match(result)) {
   dispatch(fetchBalance());
  }
 };

 const handleBack = () => {
  setModal(null);
  dispatch({ type: "topup/resetTopup" });
  route.push("/");
 };

 if (loading) {
  return <Loading />;
 }

 return (
  <section className={styles["top-up"]}>
   <div className={styles["top-up-header"]}>
    <p>Silahkan masukkan</p>
    <h3>Nominal Top Up</h3>
   </div>
   <div className={styles["top-up-wrapper"]}>
    <div className={styles["top-up-form"]}>
     <div className={styles["input-wrapper"]}>
      <Banknote size={16} />
      <input
       onChange={(e) => handleChange(e.target.value)}
       type="text"
       onKeyDown={handleKeyDown}
       value={amount ? amount.toLocaleString("id-ID") : ""}
      />
     </div>
     <button onClick={() => setModal("topup")} disabled={!amount}>
      Top Up
     </button>
    </div>
    <div className={styles["top-up-amount"]}>
     <div onClick={() => handleChange(10000)}>Rp10.000</div>
     <div onClick={() => handleChange(20000)}>Rp20.000</div>
     <div onClick={() => handleChange(50000)}>Rp50.000</div>
     <div onClick={() => handleChange(100000)}>Rp100.000</div>
     <div onClick={() => handleChange(250000)}>Rp250.000</div>
     <div onClick={() => handleChange(500000)}>Rp500.000</div>
    </div>
   </div>
   {modal === "topup" && (
    <Modal
     type={topup ? "success" : error ? "error" : "confirm"}
     message={topup ? "Top-up berhasil!" : error ? error : "Lanjutkan top-up?"}
     amount={amount}
     onConfirm={handlePurchase}
     onClose={() => setModal(null)}
     handleBack={handleBack}
    />
   )}
  </section>
 );
}
