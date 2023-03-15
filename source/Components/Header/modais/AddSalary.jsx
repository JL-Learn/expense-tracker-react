import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import styles from '../../../Components/UI/Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddSalary } from '@/source/store/ui-slice';
import useUpdateDoc from '@/source/hooks/useUpdateDoc';
import { serverTimestamp } from '@firebase/firestore';
import useAddDoc from '@/source/hooks/useAddDoc';

const AddSalary = () => {
  const [amount, setAmount] = useState(0);
  const {isVisible} = useSelector(state => state.ui.addSalary);
  const { categories } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const addTransactionHandler = useAddDoc();
  const addSalaryHandler = useUpdateDoc();

  const addSalary = (e) => {
    e.preventDefault();

    if(!amount) {
      alert('Preencha todos os campos.');
      return;
    }

    if(amount < 0 || amount == 0) {
      alert('Digite um valor não negativo e maior que zero.');
      return;
    }

    categories.forEach(category => {
      const totalAmount = (Number(amount) * category.percentage) / 100;

      addSalaryHandler('categorias', category.id, {
        amount: category.amount + totalAmount
      });

      addTransactionHandler('transactions', {
        amount: totalAmount,
        title: `Salário em ${category.title}`,
        type: 'income',
        date: serverTimestamp(),
      });
    });

    setAmount(0);
    dispatch(toggleAddSalary(null));
  };

  // console.log(isVisible);
  // console.log(category);

  return (
    <Modal isOpen={isVisible} onClose={() => dispatch(toggleAddSalary(null))} title='Adicionar Salário'>
      <div>
        <form onSubmit={addSalary}>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="amount">Valor</label>
            <input 
              type="text" 
              name="amount" 
              id="amount" 
              placeholder='R$' 
              className='max-width' 
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={styles.buttons}>
            <button className='btn btn-primary' type='submit'>Adicionar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddSalary;