import styles from "./loading.module.css";

export default function Loading() {
 return (
  <div className={styles.loading}>
   <div className={styles["loading-wrapper"]}>Loading...</div>
  </div>
 );
}
