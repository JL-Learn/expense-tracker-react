import React from 'react';
import styles from './CategoryCard.module.scss';
import {TbPencil} from 'react-icons/tb';
import useGetCurrency from '@/source/hooks/useGetCurrency';
import CategoryMenu from './CategoryMenu';
import useMenu from '@/source/hooks/useMenu';

const CategoryCard = ({data}) => {
  const{title, amount, percentage} = data;
  const [isVisible, toggleMenuHandler] = useMenu();
  const formatedAmount = useGetCurrency(amount);

  // console.log('Valores de data:', data);

  return (
    <div className={styles.card}>
      <div className={styles.edit}>
        <TbPencil className='icon hover' onClick={toggleMenuHandler} />
        {isVisible && <CategoryMenu toggleMenuHandler= {toggleMenuHandler} data={data} />}
      </div>
      <h2>{title}</h2>
      <h3>{formatedAmount}</h3>
      <h4>Alocado: {percentage}%</h4>
    </div>
  );
};

export default CategoryCard;