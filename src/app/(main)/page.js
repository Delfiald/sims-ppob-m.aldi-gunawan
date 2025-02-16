"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBanners } from "@/redux/slices/bannersSlice";
import { fetchServices } from "@/redux/slices/servicesSlice";
import Loading from "@/components/Loading/Loading";

export default function Home() {
 const dispatch = useDispatch();
 const router = useRouter();

 const {
  services,
  loading: servicesLoading,
  error: servicesError,
 } = useSelector((state) => state.services);

 const {
  banners,
  loading: bannersLoading,
  error: bannersError,
 } = useSelector((state) => state.banners);

 const handleClick = (service_code) => {
  router.push(`/purchase/${service_code}`);
 };

 const handleScroll = (e) => {
  e.currentTarget.scrollBy({
   left: e.deltaY * 2,
   behavior: "smooth",
  });
 };

 useEffect(() => {
  if (!services.length) {
   dispatch(fetchServices());
  }
  if (!banners.length) {
   dispatch(fetchBanners());
  }
 }, [banners.length, dispatch, services.length]);

 if (servicesLoading || bannersLoading) {
  return <Loading />;
 }

 return (
  <div className={styles.homepage}>
   <section className={styles.services}>
    {services.map((service) => (
     <button
      key={service.service_code}
      onClick={() => handleClick(service.service_code)}
      className={styles.service}
     >
      <div className={styles["service-image"]}>
       <Image
        src={service.service_icon}
        alt={service.service_name}
        width={1024}
        height={1024}
       />
      </div>
      <div className={styles["service-name"]}>{service.service_name}</div>
     </button>
    ))}
   </section>
   <section className={styles.banners}>
    <h3>Temukan promo menarik</h3>
    <div className={styles["banner-list"]} onWheel={handleScroll}>
     {banners.map((banner) => (
      <div key={banner.banner_name} className={styles.banner}>
       <div className={styles["banner-image"]}>
        <Image
         src={banner.banner_image}
         alt={banner.banner_name}
         width={1024}
         height={1024}
        />
       </div>
      </div>
     ))}
    </div>
   </section>
  </div>
 );
}
