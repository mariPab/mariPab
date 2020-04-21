import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCart, getTotalPrice } from '../../../redux/cartRedux.js';
import { NavLink } from 'react-router-dom';
import { CartItem } from '../CartItem/CartItem';
import styles from './Cart.module.scss';
import { countProductsInCart } from '../../../utils/countProductsInCart.js';
import { Button } from '../../common/Button/Button';
import LocalMallIcon from '@material-ui/icons/LocalMall';

const Component = ({ cart, total }) => {
  const [opened, setOpened] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setOpened(!opened);
  };

  return (
    <div>
      <div className={styles.cartlink}>
        <span>
          {total}&nbsp;zł
        </span>
        <Button
          variant="fab"
          onClick={(e) => handleClick(e)}
        >
          <LocalMallIcon color="primary" />
        </Button>
      </div>
      {opened ? (
        <div className={`${styles.root} ${opened ? styles.expanded : ''}`}>
          <div onClick={(e) => handleClick(e)} className={`${styles.background}`}></div>
          <div className={`${styles.cart}`}>
            <div className={styles.items}>
              {cart.products.length ? (cart.products.map(product => (
                <CartItem id={product._id} key={product._id} />
              ))) :
                (
                  <small className={styles.noProducts}>
                    <i>Brak produktów w koszyku</i>
                  </small>
                )
              }
            </div>
            <div className={styles.summary}>
              <p>
                Podsumowanie zamówienia
              </p>
              <div>
                <span>ilość produktów:</span>
                <span>{countProductsInCart(cart.products)}</span>
              </div>
              <div>
                <span>Wartość zamówienia: </span>
                <span>{total} zł</span>
              </div>
              <Button onClick={(e) => handleClick(e)} disabled={cart.products.length ? false : true}>
                <NavLink exact to="/order">
                  Kontynuuj zamówienie
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cart: PropTypes.object,
  total: PropTypes.number,
  expanded: PropTypes.bool,
};

const mapStateToProps = state => ({
  cart: getCart(state),
  total: getTotalPrice(state),
});

const Container = connect(mapStateToProps, null)(Component);

export {
  Container as Cart,
  Component as CartComponent,
};
