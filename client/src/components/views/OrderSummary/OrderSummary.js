import React from 'react';
import PropTypes from 'prop-types';
import { CartItem } from '../../features/CartItem/CartItem';
import { Popup } from '../../common/Popup/Popup';
import { connect } from 'react-redux';
import { getCart, getTotalPrice } from '../../../redux/cartRedux.js';
import { NavLink } from 'react-router-dom';
import styles from './OrderSummary.module.scss';
import { countProductsInCart } from '../../../utils/countProductsInCart.js';
import { OrderForm } from '../../features/OrderForm/OrderForm';
import { unmountAfterDelay } from '../../../HOC/unmountAfterDelay/unmountAfterDelay';
import { getViewportMode } from '../../../redux/viewportRedux.js';


const Component = ({ cart, total, history, mobile }) => {
  const DelayedPopup = unmountAfterDelay(Popup);
  return (
    cart.products.length ? (
      <div className={`${mobile ? styles.mobileWrapper : styles.wrapper}`}>
        <h2>Moje produkty</h2>
        <div className={styles.items}>
          {cart.products.length ? (cart.products.map(product => (
            <CartItem id={product._id} key={product._id} />
          ))) :
            (
              <small className={styles.noProducts}>
                <i>Brak produktów w koszyku</i>
              </small>
            )}
        </div>
        <NavLink className={styles.link} exact to="/">
          Dodaj kolejne produkty
        </NavLink>
        <h2>Podsumowanie zamówienia</h2>
        <div className={styles.summary}>
          <span>Ilość produktów: </span>
          <span>{countProductsInCart(cart.products)}</span>
        </div>
        <div className={styles.summary}>
          <span>Wartość zamówienia: </span>
          <span>{total} zł</span>
        </div>
        <OrderForm />

        <div className={styles.actions}>
        </div>
      </div>
    ) : (
      <DelayedPopup
        text="Najpierw dodaj produkty do koszyka"
        variant="danger"
      />
    )
  );
};
Component.propTypes = {
  cart: PropTypes.object,
  total: PropTypes.number,
  history: PropTypes.object,
  mobile: PropTypes.bool,
};

const mapStateToProps = state => ({
  cart: getCart(state),
  total: getTotalPrice(state),
  mobile: getViewportMode(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps, null)(Component);

export {
  Container as OrderSummary,
  Component as OrderSummaryComponent,
};
