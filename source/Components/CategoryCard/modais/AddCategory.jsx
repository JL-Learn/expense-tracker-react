import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import styles from '../../../Components/UI/Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddCategory } from '@/source/store/ui-slice';
import useAddDoc from '@/source/hooks/useAddDoc';

const AddCategory = () => {
  const [title, setTitle] = useState('');
  const [percentage, setPercentage] = useState(0);
  const {isVisible, category} = useSelector(state => state.ui.addCategory);
  const dispatch = useDispatch();
  const addCategoryHandler = useAddDoc();

  const addCategory = (e) => {
    e.preventDefault();

    if(!title || !percentage) {
      alert('Preencha todos os campos.');
      return;
    } 

    if(percentage < 0) {
      alert('Digite um valor não negativo para porcentagem.');
      return;
    }

    addCategoryHandler('categorias', {
      title,
      percentage: Number(percentage),
      amount: 0
    });

    setTitle('');
    setPercentage(0)
    dispatch(toggleAddCategory(null))
  };

  // console.log(isVisible);
  // console.log(category);

  return (
    <Modal isOpen={isVisible} onClose={() => dispatch(toggleAddCategory(null))} title='Nova Categoria'>
      <div>
        <form onSubmit={addCategory}>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="title">Título</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
              placeholder='Digite sua nova categoria' 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="porcentagem">Porcentagem Alocada</label>
            <input 
              type="text" 
              name="porcentagem" 
              id="porcentagem" 
              placeholder='%' 
              className='max-width' 
              onChange={(e) => setPercentage(e.target.value)} 
            />
          </div>
          <div className={styles.buttons}>
            <button className='btn btn-primary' type='submit'>Salvar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategory;