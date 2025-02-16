"use client";

import { useState } from "react";
import styles from "./transaction.module.css";
import { Minus, Plus } from "lucide-react";
import { format } from "date-fns-tz";
import { id } from "date-fns/locale";

export default function Transaction() {
 const [transactions, setTransactions] = useState([
  {
   invoice_number: "INV17082023-001",
   transaction_type: "TOPUP",
   description: "Top Up balance",
   total_amount: 100000,
   created_on: "2023-08-17T10:10:10.000Z",
  },
  {
   invoice_number: "INV17082023-002",
   transaction_type: "PAYMENT",
   description: "PLN Pascabayar",
   total_amount: 10000,
   created_on: "2023-08-17T11:10:10.000Z",
  },
  {
   invoice_number: "INV17082023-003",
   transaction_type: "PAYMENT",
   description: "Pulsa Indosat",
   total_amount: 40000,
   created_on: "2023-08-17T12:10:10.000Z",
  },
 ]);

 const [offset, setOffset] = useState(0);
 const limit = 3;

 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd MMMM yyyy HH:mm 'WIB'", {
   timeZone: "Asia/Jakarta",
   locale: id,
  });
 };

 const handleShowMore = () => {
  setOffset((prev) => prev + limit);
 };

 return (
  <section className={styles.transactions}>
   <h3>Semua Transaksi</h3>
   <div className={styles["transaction-list"]}>
    {transactions.map((transaction) => (
     <div key={transaction.invoice_number} className={styles.transaction}>
      <div
       className={`${styles.amount} ${styles[transaction.transaction_type]}`}
      >
       {transaction.transaction_type === "TOPUP" ? (
        <Plus size={16} />
       ) : transaction.transaction_type === "PAYMENT" ? (
        <Minus size={16} />
       ) : null}
       <span>Rp.</span>
       {transaction.total_amount.toLocaleString("id-ID")}
      </div>
      <div className={styles.description}>{transaction.description}</div>
      <div className={styles["created-on"]}>
       {formatDate(transaction.created_on)}
      </div>
     </div>
    ))}
   </div>
   {offset + limit < transactions.length && (
    <button onClick={handleShowMore} className={styles["show-more"]}>
     Show more
    </button>
   )}
  </section>
 );
}
