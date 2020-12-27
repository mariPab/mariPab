import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getProducts } from '../../../redux/cart/reducer';
import { NavLink } from 'react-router-dom';
import CartItem from '../CartItem';
import CartProductsCounter from '../../../helpers/cartProductsCounter';
import { CartProduct } from '../../../redux/cart/types';
import manageCartStorage from '../../../HOC/manageCartStorage';
import { RootState } from '../../../redux/store';
import CartSheet from './Cart.style';
import UI from '../../ui/UI.style';

interface MapStateToProps {
  products: CartProduct[];
}
interface Props extends MapStateToProps {
  opened: boolean;
  toggleCart: () => void;
}

export const Cart: React.FunctionComponent<Props> = ({
  products,
  opened,
  toggleCart,
}: Props) => {
  return (
    <>
      {opened ? (
        <CartSheet.Root expanded={opened}>
          <CartSheet.Background onClick={toggleCart} />
          <CartSheet.Cart>
            <CartSheet.ProductsList>
              {products.length ?
                products.map(product =>
                  <li key={product.id}>
                    <CartItem product={product} />
                  </li>
                ) :
                <li>
                  <small>
                    <i>Brak produktów w koszyku </i>
                  </small>
                </li>
              }
            </CartSheet.ProductsList>
            <CartSheet.OrderSummary>
              <h4>Podsumowanie zamówienia</h4>
              <div>
                <span>ilość produktów: </span>
                <span>{CartProductsCounter.countProducts(products)}</span>
              </div>
              <div>
                <span>Wartość zamówienia: </span>
                <span> {CartProductsCounter.countTotalPrice(products)} zł </span>
              </div>
              <UI.Button
                disabled={!products.length}
                onClick={toggleCart}
              >
                <NavLink exact to="/order">
                  Kontynuuj zamówienie
                </NavLink>
              </UI.Button>
            </CartSheet.OrderSummary>
          </CartSheet.Cart>
        </CartSheet.Root>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: RootState): MapStateToProps => ({
  products: getProducts(state),
});

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  manageCartStorage,
)(Cart) as React.ComponentType<any>;
