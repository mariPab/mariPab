import React from 'react';
import styles from './NotFound.module.scss';
import { NavLink } from 'react-router-dom';

const Component = () => (
  <div className={styles.root}>
    <p>Strona nie została znaleziona</p>
    <NavLink exact to='/'>
      Powrót do strony głównej
    </NavLink>
  </div>
);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
