import React from 'react';
import styles from './TransactionCard.module.scss';
import TransactionList from './TransactionList';

const Transactions = () => {
  return (
    <section className={styles.section}>
      <TransactionList type='income' title='Entradas'/>
      <TransactionList type='expense' title='Despesas'/>
    </section>
  );
};

export default Transactions;