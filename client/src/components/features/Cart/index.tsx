import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getProducts, getTotalPrice } from "../../../redux/cart/reducer";
import { NavLink } from "react-router-dom";
import CartItem from "../CartItem";
import styles from "./Cart.module.scss";
import { countProductsInCart } from "../../../utils/countProductsInCart";
import Button from "../../common/Button";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { CartProduct } from "../../../redux/cart/types";
import manageCartStorage from "../../../HOC/manageCartStorage";

interface MapStateToProps {
  products: CartProduct[];
  total: number;
}
type Props = MapStateToProps;

export const Cart: React.FunctionComponent<Props> = ({
  products,
  total,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const handleClick = () => setOpened(!opened);
  return (
    <div>
      <div className={styles.cartlink}>
        <span>{total}&nbsp;zł</span>
        <Button variant="fab" onClick={handleClick}>
          <LocalMallIcon color="primary" />
        </Button>
      </div>
      {opened ? (
        <div className={`${styles.root} ${opened ? styles.expanded : ""}`}>
          <div onClick={handleClick} className={`${styles.background}`}>
            {" "}
          </div>
          <div className={`${styles.cart}`}>
            <div className={styles.items}>
              {products.length ?
                products.map(product =>
                  <CartItem product={product} key={product.id} />
                ) :
                <small className={styles.noProducts}>
                  <i>Brak produktów w koszyku </i>
                </small>
              }
            </div>
            <div className={styles.summary}>
              <p>Podsumowanie zamówienia</p>
              <div>
                <span>ilość produktów: </span>
                <span>{countProductsInCart(products)}</span>
              </div>
              <div>
                <span>Wartość zamówienia: </span>
                <span> {total} zł </span>
              </div>
              <NavLink className={styles.linkContinue} exact to="/order">
                <Button
                  disabled={products.length ? false : true}
                  onClick={handleClick}
                >
                  Kontynuuj zamówienie
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: any): MapStateToProps => ({
  products: getProducts(state),
  total: getTotalPrice(state),
});

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  manageCartStorage,
)(Cart) as React.ComponentType<any>;
