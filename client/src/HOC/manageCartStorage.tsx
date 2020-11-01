import React, { ComponentType } from "react";
import { loadCartRequest, saveCart } from "../redux/cart/thunks";
import { getProducts, getTotalPrice } from "../redux/cart/reducer";
import { connect, ConnectedComponent } from "react-redux";
import { RootState } from "../redux/store";
import { CartProduct } from "../redux/cart/types";

interface MapStateToProps {
  products: CartProduct[];
  total: number;
}
interface MapDispatchToProps {
  saveCart: (data: CartProduct[]) => void;
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
        this.props.saveCart(this.props.products);
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
  loadCart: () => dispatch(loadCartRequest()),
  saveCart: (data: CartProduct[]) => dispatch(saveCart(data)),
});

export default manageCartStorage;
