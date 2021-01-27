import React, { ComponentType } from 'react';
import { loadCartStart, saveCart } from '../redux/cart/actions';
import { getProducts, getTotalPrice } from '../redux/cart/reducer';
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
  products: getProducts(state),
  total: getTotalPrice(state),
});

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  loadCart: () => dispatch(loadCartStart()),
  saveCart: () => dispatch(saveCart()),
});

export default manageCartStorage;
