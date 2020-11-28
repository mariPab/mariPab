import React from 'react';
import { connect } from 'react-redux';
import { getProductsListStart } from '../../../redux/products/actions';
import { getAll, getLoadingState } from '../../../redux/products/reducer';
import ProductCard from '../../features/ProductCard';
import styles from './Products.module.scss';
import { RootState } from '../../../redux/store';
import { Product } from '../../../redux/products/types';
import Loader from 'react-loader-spinner';

interface MapStateToProps {
  products: Product[];
  loading: boolean;
}
interface MapDispatchToProps {
  getProductsList: () => void;
}

type Props = MapStateToProps &
  MapDispatchToProps;

export class Products extends React.Component<Props> {
  componentDidMount() {
    this.props.getProductsList();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        {this.props.loading ?
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
          /> : this.props.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  products: getAll(state),
  loading: getLoadingState(state),
});
const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  getProductsList: () => dispatch(getProductsListStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
