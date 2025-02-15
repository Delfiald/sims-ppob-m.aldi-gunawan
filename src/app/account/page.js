import styles from "@/app/account/account.module.css";
import { AtSign, Edit, Pencil, User } from "lucide-react";
import Image from "next/image";

export default function Account() {
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
      <input type="email" name="email" id="email" />
     </div>
    </div>
    <div className={`${styles["input"]} ${styles.surname}`}>
     <label htmlFor="surname">Nama Depan</label>
     <div className={styles["input-wrapper"]}>
      <User size={18} />
      <input type="text" name="surname" id="surname" />
     </div>
    </div>
    <div className={`${styles["input"]} ${styles["last-name"]}`}>
     <label htmlFor="last-name">Nama Belakang</label>
     <div className={styles["input-wrapper"]}>
      <User size={18} />
      <input type="text" name="last-name" id="last-name" />
     </div>
    </div>
    <button type="submit" className={styles.submit}>
     Edit Profil
    </button>
    <button className={styles.logout}>Logout</button>
   </div>
  </div>
 );
}
