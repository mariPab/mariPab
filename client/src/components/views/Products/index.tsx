import React from 'react';
import { connect } from 'react-redux';
import { getProductsListStart, setSearchValue } from '../../../redux/products/actions';
import { getAll, getLoadingState } from '../../../redux/products/reducer';
import ProductCard from '../../features/ProductCard';
import { RootState } from '../../../redux/store';
import { Product } from '../../../redux/products/types';
import Loader from 'react-loader-spinner';
import { ProductsContainer, SearchContainer, SearchField } from './Products.style';
import { InputAdornment} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import debounce from 'debounce';

interface MapStateToProps {
  products: Product[];
  loading: boolean;
}
interface MapDispatchToProps {
  getProductsList: () => void;
  setSearchValue: (value: string) => void;
}

type Props = MapStateToProps &
  MapDispatchToProps;

export class Products extends React.Component<Props> {
  componentDidMount() {
    this.props.getProductsList();
  }
    onSearch = debounce((value: string) =>
    this.props.setSearchValue(value), 500);
  render() {
    return (
      <>
        <SearchContainer>
          <SearchField
            id="standard-basic"
            label="Szukaj produktów..."
            onChange={({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => this.onSearch(value)}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>,
            }}
          />
        </SearchContainer>
        <ProductsContainer>
          {this.props.loading ?
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={100}
              width={100}
            /> : this.props.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </ProductsContainer>
      </>
    );
  }
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  products: getAll(state),
  loading: getLoadingState(state),
});
const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  getProductsList: () => dispatch(getProductsListStart()),
  setSearchValue: (value: string) => dispatch(setSearchValue(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
