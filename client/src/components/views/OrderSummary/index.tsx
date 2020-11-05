import React, { FunctionComponent } from "react";
import CartItem from "../../features/CartItem";
import { connect } from "react-redux";
import { getCart, getTotalPrice } from "../../../redux/cart/reducer";
import { NavLink } from "react-router-dom";
import styles from "./OrderSummary.module.scss";
import { countProductsInCart } from "../../../utils/countProductsInCart";
import OrderForm from "../../features/OrderForm";
import { RootState } from "../../../redux/store";
import { CartStore } from '../../../redux/cart/types';

interface MapStateToProps {
  cart: CartStore;
  total: number;
}
type Props = MapStateToProps;

export const Component: FunctionComponent<Props> = ({ cart, total }: Props) => {
  return (
    <div className={styles.wrapper}>
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
        <span>{countProductsInCart(cart.products)}</span>
      </div>
      <div className={styles.summary}>
        <span>Wartość zamówienia: </span>
        <span>{total} zł</span>
      </div>
      <h2>Dane kontaktowe</h2>
      <OrderForm />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  cart: getCart(state),
  total: getTotalPrice(state),
});

export default connect(mapStateToProps, null)(Component);
