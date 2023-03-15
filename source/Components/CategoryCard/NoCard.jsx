import { toggleAddCategory } from '@/source/store/ui-slice';
import React from 'react';
import { TbPlus } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import styles from './NoCard.module.scss';

const NoCard = () => {
  const dispatch = useDispatch();

  return (
    <div 
      className={styles['no-card']}
      onClick={() => dispatch(toggleAddCategory(null))}
    >
      <TbPlus className='icon' />
    </div>
  );
};

export default NoCard;