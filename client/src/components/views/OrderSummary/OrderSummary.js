import React from 'react';
import PropTypes from 'prop-types';
import { CartItem } from '../../features/CartItem/CartItem';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getCart, getTotalPrice } from '../../../redux/cartRedux.js';
import { NavLink } from 'react-router-dom';
import styles from './OrderSummary.module.scss';
import Button from '@material-ui/core/Button';
import { countProductsInCart } from '../../../utils/countProductsInCart.js';

const Component = ({ className, cart, total }) => (
  <div className={clsx(className, styles.root)}>
    <h2>OrderSummary</h2>
    {cart.products.length ? (cart.products.map(product => (
      <CartItem id={product._id} key={product._id} />
    ))) :
      (
        <small className={styles.noProducts}>
          <i>Brak produktów w koszyku</i>
        </small>
      )}
    <p>Podsumowanie zamówienia</p>
    <div className={styles.summary}>
      <span>ilość produktów: </span>
      <span>{countProductsInCart(cart.products)}</span>
    </div>
    <div className={styles.summary}>
      <span>Wartość zamówienia: </span>
      <span>{total} zł</span>
    </div>
    <div className={styles.actions}>
      <NavLink className={styles.link} exact to="/">
        Powrót do strony głównej
      </NavLink>
      <Button variant="outlined">Kontynuuj zamówienie</Button>
    </div>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.object,
  total: PropTypes.number,
};

const mapStateToProps = state => ({
  cart: getCart(state),
  total: getTotalPrice(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps, null)(Component);

export {
  Container as OrderSummary,
  Component as OrderSummaryComponent,
};
