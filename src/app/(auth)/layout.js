import styles from "./authLayout.module.css";
import Image from "next/image";

export default function AuthLayout({ children }) {
 return (
  <main className={styles.auth}>
   <section className={styles["auth-content"]}>{children}</section>
   <section className={styles["auth-illustration"]}>
    <Image
     src={"/Illustrasi Login.png"}
     alt="Illustration"
     width={1024}
     height={1024}
    />
   </section>
  </main>
 );
}
