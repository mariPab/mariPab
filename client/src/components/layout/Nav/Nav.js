import React from 'react';
import PropTypes from 'prop-types';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { getTotalPrice } from '../../../redux/cartRedux.js';
import { connect } from 'react-redux';

const Component = ({ total }) => (
  <nav className={styles.root}>
    <div className={styles.navLinkList}>
      <NavLink className={styles.navlink} exact to='/'>
        Strona główna
      </NavLink>
      <NavLink className={styles.navlink} exact to='/'>
        Wyprzedaż
      </NavLink>
      <NavLink className={styles.navlink} exact to='/'>
        O nas
      </NavLink>
    </div>
    <div className={styles.cartlink}>
      <span>
        {total} zł
      </span>
      <NavLink className={styles.navlink} exact to='/cart'>
        <LocalMallIcon />
      </NavLink>
    </div>
  </nav >
);

Component.propTypes = {
  total: PropTypes.number,
};

const mapStateToProps = state => ({
  total: getTotalPrice(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as Nav,
  Container as Nav,
  Component as NavComponent,
};
