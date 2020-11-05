import React from "react";
import { compose } from "redux";
import { IMAGES_URL } from "../../../config";
import { NotFound } from "../NotFound/NotFound";
import { GalleryPic } from "../../features/GalleryPic";
import { connect } from "react-redux";
import {
  getActiveProduct,
} from "../../../redux/products/reducer";
import {
  getProductById,
} from "../../../redux/products/thunks";
import { addProductToCart } from "../../../redux/cart/actions";
import styles from "./ProductDetails.module.scss";
import { NumberInput } from "../../common/NumberInput/NumberInput";
import Button from "../../common/Button";
import { Product } from "../../../redux/products/types";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RootState } from "../../../redux/store";

interface MatchProps {
  id: string;
}

interface MapStateToProps {
  product: Product | null;
}
interface MapDispatchToProps {
  loadProduct: (id: string) => any;
  addToCart: (product: Product, amount: number) => any;
}

type Props = MapStateToProps &
  MapDispatchToProps &
  RouteComponentProps<MatchProps>;

class ProductDetails extends React.Component<Props> {
  state = {
    amount: 1,
  };
  componentDidMount(): void {
    this.props.loadProduct(this.props.match.params.id);
  }
  updateTextField = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ amount: parseInt(target.value) });
  };
  render() {
    const { product, addToCart } = this.props;
    const { amount } = this.state;
    return product && product.id ? (
      <div className={styles.wrapper}>
        <div className={styles.gallery}>
          {product.images.map((image) => (
            <GalleryPic
              key={image}
              alt={product.name}
              src={`${IMAGES_URL}/${image}`}
            />
          ))}
        </div>
        <div className={styles.content}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div>
            <span>{product.price} zł</span>
            <span>
              Ilość:&nbsp;
              <NumberInput value={amount} onChange={this.updateTextField} />
            </span>
          </div>
          <Button onClick={() => addToCart(product, amount)}>Dodaj do koszyka</Button>
        </div>
      </div>
    ) : (
        <NotFound />
      );
  }
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  product: getActiveProduct(state),
});

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  loadProduct: (id: string) => dispatch(getProductById(id)),
  addToCart: (product: Product, amount: number) =>
    dispatch(addProductToCart(product, amount)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ProductDetails) as React.ComponentClass<Props>;
