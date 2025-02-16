"use client";

import { fetchServices } from "@/redux/slices/servicesSlice";
import styles from "./purchase.module.css";

import { Banknote } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processTransaction } from "@/redux/slices/transactionsSlice";
import { fetchBalance } from "@/redux/slices/balanceSlice";

export default function Purchase() {
 const dispatch = useDispatch();
 const route = useRouter();
 const params = useParams();
 const { service_code } = params;

 const {
  services,
  loading: servicesLoading,
  error: servicesError,
 } = useSelector((state) => state.services);

 const { transaction, loading, error } = useSelector(
  (state) => state.transactions
 );

 const service = services.find((s) => s.service_code === service_code);

 useEffect(() => {
  if (!services.length) {
   dispatch(fetchServices());
  }
 }, [services.length, dispatch]);

 const handlePurchase = async () => {
  const result = await dispatch(
   processTransaction({
    service_code: service_code,
   })
  );

  if (processTransaction.fulfilled.match(result)) {
   dispatch(fetchBalance());
  }
 };

 const handleBack = () => {
  dispatch({ type: "transactions/resetTransaction" });
  route.push("/");
 };

 if (servicesLoading) {
  return <p className={styles.loading}>Loading...</p>;
 }

 if (!service || servicesError) {
  return <p>Gk ada</p>;
 }

 return (
  <section className={styles["purchase"]}>
   <div className={styles["purchase-header"]}>
    <p>PemBayaran</p>
    <div className={styles["purchase-information"]}>
     <div className={styles["purchase-icon"]}>
      <Image
       src={service.service_icon}
       alt={service.service_name}
       width={512}
       height={512}
      />
     </div>
     <div className={styles["purchase-name"]}>{service.service_name}</div>
    </div>
   </div>
   <div className={styles["purchase-wrapper"]}>
    <div className={styles["input-wrapper"]}>
     <Banknote size={16} />
     <input
      type="text"
      value={service.service_tariff.toLocaleString("id-ID") ?? ""}
      readOnly
     />
    </div>
    <button onClick={handlePurchase}>Bayar</button>
    {transaction && (
     <div className={styles.modal}>
      <div className="message">{transaction}</div>
      <button onClick={handleBack} className={styles.back}>
       Kembali ke Beranda
      </button>
     </div>
    )}
   </div>
  </section>
 );
}
