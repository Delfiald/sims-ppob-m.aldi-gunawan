"use client";

import styles from "./modal.module.css";
import Image from "next/image";
import { Check, X } from "lucide-react";

export default function Modal({
 type,
 message,
 amount,
 onConfirm,
 onClose,
 handleBack,
}) {
 return (
  <div className={styles.modal}>
   <div className={styles["modal-wrapper"]}>
    <div className={styles["modal-content"]}>
     <div
      className={
       type === "success"
        ? styles["icon-wrapper-success"]
        : type === "error"
        ? styles["icon-wrapper-error"]
        : styles["icon-wrapper"]
      }
     >
      {type === "success" ? (
       <Check size={24} />
      ) : type === "error" ? (
       <X size={24} />
      ) : (
       <Image src={"/Logo.png"} alt="Pop-up-image" width={512} height={512} />
      )}
     </div>
     <div className={styles.message}>{message}</div>
     <div className={styles.price}>Rp{amount.toLocaleString("id-ID")}</div>
     {type === "confirm" ? (
      <>
       <button className={styles.continue} onClick={onConfirm}>
        Ya, lanjutkan
       </button>
       <button className={styles.cancel} onClick={onClose}>
        Batalkan
       </button>
      </>
     ) : (
      <button className={styles.back} onClick={handleBack}>
       Kembali ke Beranda
      </button>
     )}
    </div>
   </div>
  </div>
 );
}
