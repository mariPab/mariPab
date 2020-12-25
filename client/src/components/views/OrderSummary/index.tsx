import React, { FunctionComponent, useState, useEffect } from 'react';
import CartItem from '../../features/CartItem';
import { connect } from 'react-redux';
import { getCart } from '../../../redux/cart/reducer';
import { NavLink } from 'react-router-dom';
import styles from './OrderSummary.module.scss';
import CartProductsCounter from '../../../helpers/cartProductsCounter';
import OrderForm from '../../features/OrderForm';
import { RootState } from '../../../redux/store';
import { CartStore } from '../../../redux/cart/types';
import { useHistory } from 'react-router-dom';

interface MapStateToProps {
  cart: CartStore;
}
type Props = MapStateToProps;

export const Component: FunctionComponent<Props> = ({ cart }: Props) => {
  const history = useHistory();
  const [total, setTotal] = useState(CartProductsCounter.countTotalPrice(cart.products));
  useEffect(() => {
    if (total === 0 || !cart.products.length) {
      if (history.length > 1) {
        history.goBack();
      } else {
        history.replace('/');
      }
    }
  }, [cart.products.length, history, total]);
  useEffect(() => {
    setTotal(CartProductsCounter.countTotalPrice(cart.products));
  }, [cart.products]);
  return (
    <div className={styles.wrapper}>
      {total !== 0 || cart.products.length ?
        <>
          <h2>Moje produkty</h2>
          <div className={styles.items}>
            {cart.products.length ?
              cart.products.map((product) => (
                <CartItem product={product} key={product.id} />
              ))
              :
              <small className={styles.noProducts}>
                <i>Brak produktów w koszyku</i>
              </small>
            }
          </div>
          <NavLink className={styles.link} exact to="/">
          Dodaj kolejne produkty
          </NavLink>
          <h2>Podsumowanie zamówienia</h2>
          <div className={styles.summary}>
            <span>Ilość produktów: </span>
            <span>{CartProductsCounter.countProducts(cart.products)}</span>
          </div>
          <div className={styles.summary}>
            <span>Wartość zamówienia: </span>
            <span>{total} zł</span>
          </div>
          <h2>Dane kontaktowe</h2>
          <OrderForm />
        </>
        : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  cart: getCart(state),
});

export default connect(mapStateToProps, null)(Component);
