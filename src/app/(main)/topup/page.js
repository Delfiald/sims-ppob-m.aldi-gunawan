"use client";

import { Banknote } from "lucide-react";
import styles from "./topup.module.css";
import { useState } from "react";

export default function Topup() {
 const [amount, setAmount] = useState(null);

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
       onKeyDown={handleKeyDown}
       type="text"
       value={amount ? amount.toLocaleString("id-ID") : ""}
      />
     </div>
     <button disabled={!amount}>Top Up</button>
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
  </section>
 );
}
