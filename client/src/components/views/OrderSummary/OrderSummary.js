import React from 'react';
import PropTypes from 'prop-types';
import { CartItem } from '../../features/CartItem/CartItem';
import { connect } from 'react-redux';
import { getCart, getTotalPrice } from '../../../redux/cartRedux.js';
import { NavLink } from 'react-router-dom';
import styles from './OrderSummary.module.scss';
import { countProductsInCart } from '../../../utils/countProductsInCart.js';
import { OrderForm } from '../../features/OrderForm/OrderForm';

const Component = ({ cart, total, history }) => (
  cart.products.length ? (
    <div className={styles.wrapper}>
      <h2>Podsumowanie zamówienia</h2>
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
      <OrderForm />
      <NavLink className={styles.link} exact to="/">
        Powrót do strony głównej
      </NavLink>
      <div className={styles.actions}>
      </div>
    </div>
  ) : (
    <div>
      {history.push('/')}
      {window.alert('Najpierw dodaj produkty do koszyka')}
    </div>
  )
);

Component.propTypes = {
  cart: PropTypes.object,
  total: PropTypes.number,
  history: PropTypes.object,
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
