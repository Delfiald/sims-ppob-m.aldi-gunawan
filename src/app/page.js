import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
 return (
  <div className={styles.page}>
   <main className={styles.main}>
    <h1>SIMS PPOB - M.Aldi Gunawan</h1>
   </main>
   <footer className={styles.footer}>
    <p>&copy; MAG 2025</p>
   </footer>
  </div>
 );
}
