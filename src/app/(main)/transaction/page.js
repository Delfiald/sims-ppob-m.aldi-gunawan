"use client";

import { useEffect, useState } from "react";
import styles from "./transaction.module.css";
import { Minus, Plus } from "lucide-react";
import { format } from "date-fns-tz";
import { id } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import {
 fetchTransactions,
 resetTransactions,
} from "@/redux/slices/transactionsSlice";
import Loading from "@/components/Loading/Loading";

export default function Transaction() {
 const dispatch = useDispatch();
 const {
  transactions,
  isFetched,
  loading: transactionsLoading,
  error: transactionsError,
 } = useSelector((state) => state.transactions);

 const [offset, setOffset] = useState(0);
 const limit = 3;
 const [hasMore, setHasMore] = useState(true);

 const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd MMMM yyyy HH:mm 'WIB'", {
   timeZone: "Asia/Jakarta",
   locale: id,
  });
 };

 const handleShowMore = async () => {
  const newOffset = offset + limit;
  const result = await dispatch(fetchTransactions(newOffset)).unwrap();

  if (result.length === 0) {
   setHasMore(false);
  } else {
   setOffset(newOffset);
  }
 };

 useEffect(() => {
  if (!isFetched) {
   dispatch(fetchTransactions(0));
  }

  return () => {
   if (isFetched) {
    dispatch(resetTransactions());
   }
  };
 }, [dispatch, isFetched]);

 if (transactionsLoading && transactions.length === 0) {
  return <Loading />;
 }

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
   {!transactionsLoading && hasMore && (
    <button onClick={handleShowMore} className={styles["show-more"]}>
     Show more
    </button>
   )}
  </section>
 );
}
