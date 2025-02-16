"use client";

import { fetchServices } from "@/redux/slices/servicesSlice";
import styles from "./purchase.module.css";

import { Banknote, Check, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processTransaction } from "@/redux/slices/transactionsSlice";
import { fetchBalance } from "@/redux/slices/balanceSlice";
import Modal from "@/components/Modal/Modal";

export default function Purchase() {
 const dispatch = useDispatch();
 const route = useRouter();
 const params = useParams();
 const { service_code } = params;
 const [modal, setModal] = useState(null);

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
  setModal(null);
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
    <button onClick={() => setModal("transaction")}>Bayar</button>
   </div>
   {modal === "transaction" && (
    <Modal
     type={transaction ? "success" : error ? "error" : "confirm"}
     message={
      transaction
       ? transaction
       : error
       ? error
       : `Beli ${service.service_name} senilai`
     }
     amount={service.service_tariff}
     onConfirm={handlePurchase}
     onClose={() => setModal(null)}
     handleBack={handleBack}
    />
   )}
  </section>
 );
}
