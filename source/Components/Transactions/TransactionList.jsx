import React from 'react';
import { useSelector } from 'react-redux';
import TransactionCard from './TransactionCard';
import styles from './TransactionList.module.scss';

const TransactionList = ({title, type}) => {
  const list = useSelector(state => state.app.transactions)
  .filter(transaction => transaction.type.toLowerCase() === type)
  .sort((a, b) => b.date?.toDate() - a.date?.toDate())
  .slice(0, 8)
  .map(element => <TransactionCard key={element.id} transaction={element} />);

  // console.log('Lista de transações:', list);
  // console.log('Lista do tipo income:', list);

  return (
    <div className={styles.transactions}>
      <h2>{title}</h2>
      <div>
        <ul className={styles.list}>
          {list}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;