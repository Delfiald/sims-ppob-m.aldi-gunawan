"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
 const [services, setServices] = useState([
  {
   service_code: "PAJAK",
   service_name: "Pajak PBB",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 40000,
  },
  {
   service_code: "PLN",
   service_name: "Listrik",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 10000,
  },
  {
   service_code: "PDAM",
   service_name: "PDAM Berlangganan",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 40000,
  },
  {
   service_code: "PULSA",
   service_name: "Pulsa",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 40000,
  },
  {
   service_code: "PGN",
   service_name: "PGN Berlangganan",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 50000,
  },
  {
   service_code: "MUSIK",
   service_name: "Musik Berlangganan",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 50000,
  },
  {
   service_code: "TV",
   service_name: "TV Berlangganan",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 50000,
  },
  {
   service_code: "PAKET_DATA",
   service_name: "Paket data",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 50000,
  },
  {
   service_code: "VOUCHER_GAME",
   service_name: "Voucher Game",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 100000,
  },
  {
   service_code: "VOUCHER_MAKANAN",
   service_name: "Voucher Makanan",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 100000,
  },
  {
   service_code: "QURBAN",
   service_name: "Qurban",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 200000,
  },
  {
   service_code: "ZAKAT",
   service_name: "Zakat",
   service_icon: "https://nutech-integrasi.app/dummy.jpg",
   service_tariff: 300000,
  },
 ]);

 const [banners, setBanners] = useState([
  {
   banner_name: "Banner 1",
   banner_image: "https://nutech-integrasi.app/dummy.jpg",
   description: "Lerem Ipsum Dolor sit amet",
  },
  {
   banner_name: "Banner 2",
   banner_image: "https://nutech-integrasi.app/dummy.jpg",
   description: "Lerem Ipsum Dolor sit amet",
  },
  {
   banner_name: "Banner 3",
   banner_image: "https://nutech-integrasi.app/dummy.jpg",
   description: "Lerem Ipsum Dolor sit amet",
  },
  {
   banner_name: "Banner 4",
   banner_image: "https://nutech-integrasi.app/dummy.jpg",
   description: "Lerem Ipsum Dolor sit amet",
  },
  {
   banner_name: "Banner 5",
   banner_image: "https://nutech-integrasi.app/dummy.jpg",
   description: "Lerem Ipsum Dolor sit amet",
  },
  {
   banner_name: "Banner 6",
   banner_image: "https://nutech-integrasi.app/dummy.jpg",
   description: "Lerem Ipsum Dolor sit amet",
  },
 ]);

 const handleScroll = (e) => {
  e.currentTarget.scrollBy({
   left: e.deltaY * 2,
   behavior: "smooth",
  });
 };

 return (
  <div className={styles.homepage}>
   <section className={styles.services}>
    {services.map((service) => (
     <Link
      key={service.service_code}
      href={`/topup/${service.service_code}`}
      className={styles.service}
     >
      <div className={styles["service-image"]}>
       <Image
        src={"/services/Listrik.png"}
        alt={service.service_name}
        width={1024}
        height={1024}
       />
      </div>
      <div className={styles["service-name"]}>{service.service_name}</div>
     </Link>
    ))}
   </section>
   <section className={styles.banners}>
    <h3>Temukan promo menarik</h3>
    <div className={styles["banner-list"]} onWheel={handleScroll}>
     {banners.map((banner) => (
      <div key={banner.banner_name} className={styles.banner}>
       <div className={styles["banner-image"]}>
        <Image
         src={"/banners/Banner 1.png"}
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
