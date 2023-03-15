import React, { useEffect, useState } from 'react';
import Modal from '../../UI/Modal';
import styles from '../../../Components/UI/Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTransferAmount } from '@/source/store/ui-slice';
import useUpdateDoc from '@/source/hooks/useUpdateDoc';

const TransferAmount = () => {
  const [options, setOptions] = useState([]);
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState(0);

  const { categories } = useSelector((state) => state.app);

  const {isVisible, category} = useSelector(state => state.ui.transferAmount);
  const dispatch = useDispatch();

  useEffect(() => {

    const options = categories
    .map((category) => category.title)
    .filter((title) => title !== category?.title);

    setOptions(options);
    setDestination(options[0]);

  }, [categories, category?.title]);

  const transferAmountHandler = useUpdateDoc();

  const transferAmount = (e) => {
    e.preventDefault();

    if(!amount || !destination) {
      alert('Preencha todos os campos.');
      return;
    }

    if(amount > category.amount || amount < 0) {
      alert('Digite um valor que não seja maior ou menor do que o valor de caixa.');
      return;
    }

    const destinationCategory = categories.find(
      (category) => category.title === destination
    );

    transferAmountHandler('categorias', category.id, {
      amount: category.amount - Number(amount),
    });

    transferAmountHandler('categorias', destinationCategory.id, {
      amount: destinationCategory.amount + Number(amount),
    });

    setAmount(0);
    dispatch(toggleTransferAmount(null));
  };

  // console.log(options);
  // console.log(isVisible);
  // console.log(category);
  // console.log('Quantidade atual:', category?.amount);

  return (
    <Modal isOpen={isVisible} onClose={() => dispatch(toggleTransferAmount(null))} title='Transferir'>
      <div>
        <form onSubmit={transferAmount}>
          <div className={styles['label-input']}>
            <p>De</p>
            <p className='caption'>{category?.title ?? 'Não encontrado'}</p>
          </div>
          <div className={styles['label-input']}>
            <label htmlFor="destination">Para</label>
            <select 
              className='max-width' 
              name="destination" 
              id="destination" 
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
            >
              {options.map((option, i) => {
                return (
                  <option key={i} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="amount">Valor</label>
            <input 
              type="text" 
              name="amount" 
              id="amount" 
              placeholder='R$' 
              className='max-width' 
              onChange={e => setAmount(e.target.value)} 
            />
          </div>
          <div className={styles.buttons}>
            <button className='btn btn-primary' type='submit'>Transferir</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TransferAmount;