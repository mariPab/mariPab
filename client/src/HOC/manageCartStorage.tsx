import React, { ComponentType } from 'react';
import { cartSelectors, cartActions } from '../redux/cart';
import { connect, ConnectedComponent } from 'react-redux';
import { RootState } from '../redux/store';

interface MapStateToProps {
  products: Cart.CartProduct[];
  total: number;
}
interface MapDispatchToProps {
  saveCart: () => void;
  loadCart: () => void;
}

type Props = MapStateToProps &
  MapDispatchToProps;

function manageCartStorage(Cmp: ComponentType<any>): ConnectedComponent<ComponentType<any>, any> {
  class Controller extends React.Component<Props> {
    componentDidMount(): void {
      this.props.loadCart();
    }
    componentDidUpdate(prev: Props): void {
      if (prev.total !== this.props.total) {
        this.props.saveCart();
      }
    }
    render(): React.ReactElement {
      return <Cmp {...this.props} />;
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Controller);
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  products: state.cart.products,
  total: cartSelectors.getTotalPrice(state),
});

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  loadCart: () => dispatch(cartActions.loadCartStart()),
  saveCart: () => dispatch(cartActions.saveCart()),
});

export default manageCartStorage;
