import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import styles from '../../../Components/UI/Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSubtractAmount } from '@/source/store/ui-slice';
import useUpdateDoc from '@/source/hooks/useUpdateDoc';
import useAddDoc from '@/source/hooks/useAddDoc';
import { serverTimestamp } from '@firebase/firestore';

const SubtractAmount = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const {isVisible, category} = useSelector(state => state.ui.subtractAmount);
  const dispatch = useDispatch();

  const subtractAmountHandler = useUpdateDoc();
  const addTransactionHandler = useAddDoc();

  const subtractAmount = (e) => {
    e.preventDefault();

    if(!title || !amount) {
      alert('Preencha todos os campos.');
      return;
    } 

    if(amount > category.amount || amount < 0) {
      alert('Digite um valor que não seja maior ou menor do que o valor de caixa.');
      return;
    }

    subtractAmountHandler('categorias', category.id, {
      amount: category.amount - Number(amount)
    });

    addTransactionHandler('transactions', {
      amount: Number(amount),
      title,
      type: 'expense',
      date: serverTimestamp(),
    });

    setTitle('');
    setAmount(0);
    dispatch(toggleSubtractAmount(null));
  };

  // console.log(isVisible);
  // console.log(category);

  return (
    <Modal isOpen={isVisible} onClose={() => dispatch(toggleSubtractAmount(null))} title='Descontar'>
      <div>
        <form onSubmit={subtractAmount}>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="title">Título</label>
            <input type="text" name="title" id="title" placeholder='Ex: tinta da impressora' maxLength='25' onChange={e => setTitle(e.target.value)} />
          </div>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="amount">Valor</label>
            <input type="text" name="amount" id="amount" placeholder='R$' className='max-width' onChange={e => setAmount(e.target.value)} />
          </div>
          <div className={styles.buttons}>
            <button className='btn btn-primary' type='submit'>Descontar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SubtractAmount;