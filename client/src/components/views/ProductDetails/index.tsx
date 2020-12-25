import React from 'react';
import { compose } from 'redux';
import { IMAGES_URL } from '../../../settings/config';
import { NotFound } from '../NotFound/NotFound';
import { GalleryPic } from '../../features/GalleryPic';
import { connect } from 'react-redux';
import { getActiveProduct } from '../../../redux/products/reducer';
import { getProductByIdStart} from '../../../redux/products/actions';
import { addProductToCart } from '../../../redux/cart/actions';
import { NumberInput } from '../../common/NumberInput/NumberInput';
import UI from '../../ui/UI.style';
import { Product } from '../../../redux/products/types';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { NavLink } from 'react-router-dom';
import { setActiveTags } from '../../../redux/products/actions';
import ProdDetails from './ProductDetails.style';
import { Tag } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
interface MatchProps {
  id: string;
}

interface MapStateToProps {
  product: Product | null;
}
interface MapDispatchToProps {
  loadProduct: (id: string) => void;
  addToCart: (product: Product, amount: number) => void;
  filterByTags: (tags: string[]) => void;
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
      <ProdDetails.Container>
        <ProdDetails.Gallery>
          {product.images.map((image) => (
            <GalleryPic
              key={image}
              alt={product.name}
              src={`${IMAGES_URL}/${image}`}
            />
          ))}
        </ProdDetails.Gallery>
        <ProdDetails.DetailsContent>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <ProdDetails.ActionsBox spaceBetween>
            <span>{product.price} zł</span>
            <span>
              Ilość:&nbsp;
              <NumberInput value={amount} onChange={this.updateTextField} />
            </span>
          </ProdDetails.ActionsBox>
          <ProdDetails.ActionsBox>
            {product.tags ? product.tags?.map(tag =>
              <NavLink exact to='/products'>
                <UI.Button
                  noPadding
                  noBorder
                  onClick={this.props.filterByTags.bind(null, [tag])}
                >
                  <Tag color="blue" key={tag}>{tag}</Tag>
                </UI.Button>
              </NavLink>
            ) : null}
          </ProdDetails.ActionsBox>
          <UI.Button
            floatRight
            noBorder
            onClick={addToCart.bind(null, product, amount)}
          >
            Dodaj do koszyka
            <PlusCircleOutlined />
          </UI.Button>
        </ProdDetails.DetailsContent>
      </ProdDetails.Container>
    ) : (
      <NotFound />
    );
  }
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  product: getActiveProduct(state),
});

const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  loadProduct: (id: string) => dispatch(getProductByIdStart(id)),
  addToCart: (product: Product, amount: number) =>
    dispatch(addProductToCart(product, amount)),
  filterByTags: (tags: string[]) => dispatch(setActiveTags(tags)),

});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ProductDetails) as React.ComponentClass<Props>;
