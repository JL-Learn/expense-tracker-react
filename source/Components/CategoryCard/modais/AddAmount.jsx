import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import styles from '../../../Components/UI/Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddAmount } from '@/source/store/ui-slice';
import useUpdateDoc from '@/source/hooks/useUpdateDoc';
import useAddDoc from '@/source/hooks/useAddDoc';
import { serverTimestamp } from '@firebase/firestore';

const AddAmount = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const {isVisible, category} = useSelector(state => state.ui.addAmount);
  const dispatch = useDispatch();

  const addAmountHandler = useUpdateDoc();
  const addTransactionHandler = useAddDoc();

  const AddAmount = (e) => {
    e.preventDefault();

    if(!title || !amount) {
      alert('Preencha todos os campos.');
      return;
    }

    if(amount < 0) {
      alert('Digite um valor não negativo para porcentagem.');
      return;
    }

    addAmountHandler('categorias', category.id, {
      amount: category.amount + Number(amount),
    });

    addTransactionHandler('transactions', {
      amount: Number(amount),
      title,
      type: 'income',
      date: serverTimestamp(),
    });

    setTitle('');
    setAmount(0);
    dispatch(toggleAddAmount(null));
  };

  // console.log(isVisible);
  // console.log(category);

  return (
    <Modal isOpen={isVisible} onClose={() => dispatch(toggleAddAmount(null))} title='Adicionar'>
      <div>
        <form onSubmit={AddAmount}>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="title">Título</label>
            <input type="text" name="title" id="title" placeholder='Ex: venda de impressora' maxLength='25' onChange={e => setTitle(e.target.value)} />
          </div>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="amount">Valor</label>
            <input type="text" name="amount" id="amount" placeholder='R$' className='max-width' onChange={e => setAmount(e.target.value)} />
          </div>
          <div className={styles.buttons}>
            <button className='btn btn-primary' type='submit'>Adicionar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddAmount;