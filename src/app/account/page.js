"use client";

import styles from "@/app/account/account.module.css";
import { AtSign, Pencil, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Account() {
 const [editable, setEditable] = useState(false);
 return (
  <div className={styles.account}>
   <div className={`${styles["input"]} ${styles["profile-picture"]}`}>
    <label htmlFor="profile-picture">
     <Image
      src={"/Profile Photo.png"}
      alt="profile-picture"
      width={512}
      height={512}
     />
     <div className={styles["edit-icon"]}>
      <Pencil size={16} />
     </div>
    </label>
    <input type="file" name="profile-picture" id="profile-picture" />
   </div>
   <div className={styles.username}>{`Kristanto Wibowo`}</div>
   <div className={styles["profile-form"]}>
    <div className={`${styles["input"]} ${styles.email}`}>
     <label htmlFor="email">Email</label>
     <div className={styles["input-wrapper"]}>
      <AtSign size={18} />
      <input type="email" name="email" id="email" disabled={!editable} />
     </div>
    </div>
    <div className={`${styles["input"]} ${styles.surname}`}>
     <label htmlFor="surname">Nama Depan</label>
     <div className={styles["input-wrapper"]}>
      <User size={18} />
      <input type="text" name="surname" id="surname" disabled={!editable} />
     </div>
    </div>
    <div className={`${styles["input"]} ${styles["last-name"]}`}>
     <label htmlFor="last-name">Nama Belakang</label>
     <div className={styles["input-wrapper"]}>
      <User size={18} />
      <input type="text" name="last-name" id="last-name" disabled={!editable} />
     </div>
    </div>
    {!editable ? (
     <>
      <button onClick={() => setEditable(true)} className={styles.edit}>
       Edit Profile
      </button>
      <button className={styles.logout}>Logout</button>
     </>
    ) : (
     <>
      <button onClick={() => setEditable(false)} className={styles.submit}>
       Simpan
      </button>
      <button onClick={() => setEditable(false)} className={styles.cancel}>
       Batalkan
      </button>
     </>
    )}
   </div>
  </div>
 );
}
