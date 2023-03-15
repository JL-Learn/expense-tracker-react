import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import styles from '../../../Components/UI/Modal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditCategory } from '@/source/store/ui-slice';
import useUpdateDoc from '@/source/hooks/useUpdateDoc';
import useDeleteDoc from '@/source/hooks/useDeleteDoc';

const EditCategory = () => {
  const [title, setTitle] = useState('');
  const [percentage, setPercentage] = useState(0);
  const {isVisible, category} = useSelector(state => state.ui.editCategory);
  const dispatch = useDispatch();

  const editCategoryHandler = useUpdateDoc();
  const deleteCategoryHandler = useDeleteDoc();

  const editCategory = (e) => {
    e.preventDefault();

    if(!title || !percentage) {
      alert('Preencha todos os campos.');
      return;
    } 

    if(percentage < 0) {
      alert('Digite um valor não negativo para porcentagem.');
      return;
    }

    editCategoryHandler('categorias', category.id, {
      title, percentage
    });

    setPercentage(0);
    setTitle('');
    dispatch(toggleEditCategory(null));
  };

  const deleteCategory = () => {
    deleteCategoryHandler('categorias', category.id);
    setTitle('');
    setPercentage(0);
    dispatch(toggleEditCategory(null));
  };

  // console.log(isVisible);
  // console.log(category);

  return (
    <Modal isOpen={isVisible} onClose={() => dispatch(toggleEditCategory(null))} title='Editar'>
      <div>
        <form onSubmit={editCategory}>
          <div className={styles['label-input']}>
            <label className='p' htmlFor="title">Título</label>
            <input 
              type="text" 
              name="title" 
              id="title" 
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
            <button 
              className='btn btn-secondary' 
              type='button'
              onClick={deleteCategory}
            > Excluir
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCategory;