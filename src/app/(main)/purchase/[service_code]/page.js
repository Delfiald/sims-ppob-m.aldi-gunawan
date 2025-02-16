"use client";

import { fetchServices } from "@/redux/slices/servicesSlice";
import styles from "./purchase.module.css";

import { Banknote } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Purchase() {
 const dispatch = useDispatch();
 const params = useParams();
 const { service_code } = params;

 const {
  services,
  loading: servicesLoading,
  error: servicesError,
 } = useSelector((state) => state.services);

 const service = services.find((s) => s.service_code === service_code);

 useEffect(() => {
  if (!services.length) {
   dispatch(fetchServices());
  }
 }, [services.length, dispatch]);

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
    <button>Bayar</button>
   </div>
  </section>
 );
}
