import useCloseMenu from '@/source/hooks/useCloseMenu';
import { toggleAddSalary } from '@/source/store/ui-slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import CardMenu from '../UI/CardMenu';

const HeaderMenu = ({ toggleMenuHandler }) => {
  const dispatch = useDispatch();
  const cardRef = useCloseMenu(toggleMenuHandler);

  return (
    <CardMenu ref={cardRef}>
      <li onClick={() => dispatch(toggleAddSalary(null))}>Adicionar Salário</li>
    </CardMenu>
  );
};

export default HeaderMenu;