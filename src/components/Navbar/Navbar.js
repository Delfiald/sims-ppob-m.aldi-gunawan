import styles from "@/components/Navbar/navbar.module.css";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
 return (
  <header className={styles.header}>
   <nav>
    <Link href={"/"} className={styles.hero}>
     <Image src={"/Logo.png"} alt="Websites Logo" width={24} height={24} />
     <h1>SIMS PPOB-M.Aldi Gunawan</h1>
    </Link>
    <div className={styles["nav-links"]}>
     <Link href={"/topup"}>Top Up</Link>
     <Link href={"/transaction"}>Transaction</Link>
     <Link href={"/account"}>Akun</Link>
    </div>
   </nav>
  </header>
 );
}

export default Navbar;
