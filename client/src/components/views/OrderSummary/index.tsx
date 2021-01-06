import React, { FunctionComponent, useState, useEffect } from 'react';
import CartItem from '../../features/CartItem';
import { connect } from 'react-redux';
import { getCart } from '../../../redux/cart/reducer';
import OrderForm from '../../features/OrderForm';
import { RootState } from '../../../redux/store';
import { CartStore } from '../../../redux/cart/types';
import { useHistory } from 'react-router-dom';
import Summary from './OrderSummary.style';
import { useCartProducts } from '../../../helpers/useCartProducts';
import UI from '../../ui/UI.style';

interface MapStateToProps {
  cart: CartStore;
}
type Props = MapStateToProps;

export const OrderSummary: FunctionComponent<Props> = ({ cart }: Props) => {
  const history = useHistory();
  const { total, productsAmount } = useCartProducts(cart.products);
  useEffect(() => {
    if (total === 0 || !cart.products.length) {
      if (history.length > 1) {
        history.goBack();
      } else {
        history.replace('/');
      }
    }
  }, [cart.products.length, history, total]);
  return (
    <Summary.Container>
      <div>
        <Summary.Section>
          <h2>Moje produkty</h2>
          <Summary.MyProducts>
            {cart.products.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </Summary.MyProducts>
          <UI.InlineLink exact to="/">
            Dodaj kolejne produkty
          </UI.InlineLink>
        </Summary.Section>
        <Summary.Section>
          <h2>Podsumowanie zamówienia</h2>
          <Summary.Total>
          <span>Ilość produktów: </span>
          <span><b>{productsAmount}</b></span>
          </Summary.Total>
          <Summary.Total>
          <span>Wartość zamówienia: </span>
          <span><b>{total} zł</b></span>
            </Summary.Total>
        </Summary.Section>
      </div>
      <div>
        <h2>Dane kontaktowe</h2>
        <OrderForm />
      </div>
    </Summary.Container>
  );
};

const mapStateToProps = (state: RootState) => ({
  cart: getCart(state),
});

export default connect(mapStateToProps, null)(OrderSummary);
