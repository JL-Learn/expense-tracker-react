import useGetCurrency from '@/source/hooks/useGetCurrency';
import useGetDate from '@/source/hooks/useGetDate';
import React from 'react';
import { TbCurrencyDollar } from 'react-icons/tb';
import styles from './TransactionCard.module.scss';

const TransactionCard = ({transaction}) => {
  const {title, date, type, amount} = transaction;

  const formatedAmount = useGetCurrency(amount);
  const formatedDate = useGetDate(date);

  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <div className={`${styles.icon} ${styles[type]}`}>
          <TbCurrencyDollar />
        </div>
        <div>
          <h3>{title}</h3>
          <h4>{formatedDate}</h4>
        </div>
      </div>
      <div className={styles.price}>
        <span className={styles[type]}>{formatedAmount}</span>
      </div>
    </li>
  );
};

export default TransactionCard;