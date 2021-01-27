import React, { FunctionComponent, useState, useEffect } from 'react';
import CartItem from '../../features/CartItem';
import { connect } from 'react-redux';
import { getCart } from '../../../redux/cart/reducer';
import OrderForm from '../../features/OrderForm';
import { RootState } from '../../../redux/store';
import { useHistory } from 'react-router-dom';
import Summary from './OrderSummary.style';
import { useCartProducts } from '../../../helpers/useCartProducts';
import UI from '../../ui/UI.style';
import { submitOrderStart } from '../../../redux/cart/actions';

interface MapStateToProps {
  cart: Cart.Store;
}
interface MapDispatchToProps {
  submitOrder: (customerData: Cart.Customer) => void;
}
type Props = MapStateToProps & MapDispatchToProps;

export const OrderSummary: FunctionComponent<Props> = ({ cart, submitOrder }: Props) => {
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
      <Summary.TransparentBackground orderProcessing={cart.orderProcessing}>
        {cart.orderProcessing &&
          <UI.Loader centered />
        }
      </Summary.TransparentBackground>
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
        <OrderForm onOrderSubmission={submitOrder}/>
      </div>
        </Summary.Container>

  );
};

const mapStateToProps = (state: RootState) => ({
  cart: getCart(state),
});
const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  submitOrder: (customerData: Cart.Customer) =>
    dispatch(submitOrderStart(customerData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
