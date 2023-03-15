import useMenu from '@/source/hooks/useMenu';
import { toggleAddSalary } from '@/source/store/ui-slice';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Header.module.scss';
import HeaderMenu from './HeaderMenu';
import AddSalary from './modais/AddSalary';

const Header = () => {
  const dispatch = useDispatch();
  const [isVisible, toggleMenuHandler] = useMenu();

  return (
    <>
      <AddSalary onClick={() => dispatch(toggleAddSalary(null))} />
      <section className={styles.header}>
        <div className={styles.message}>
          <h1>Olá! Senti sua falta 😊</h1>
          <h3 style={{ color: '#d0d0d0' }}>Sua carteira digital está disponível</h3>
        </div>
        <div className={styles.avatar}>
          <Image
            src='/avatar.png'
            alt='Avatar'
            width={64}
            height={64}
            onClick={toggleMenuHandler}
          />
          {isVisible && <HeaderMenu toggleMenuHandler={toggleMenuHandler} />}

        </div>
      </section>
    </>
  );
};

export default Header;