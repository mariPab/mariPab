import React from 'react';
import { connect } from 'react-redux';
import { getProductsListStart, setSearchValue, setActiveTags } from '../../../redux/products/actions';
import { getAll, getLoadingState } from '../../../redux/products/reducer';
import ProductCard from '../../features/ProductCard';
import { RootState } from '../../../redux/store';
import { Product } from '../../../redux/products/types';
import {
  ProductsContainer,
  SearchContainer,
} from './Products.style';
import UI from '../../ui/UI.style';
import { Search } from '@material-ui/icons';
import debounce from 'debounce';
import { Select, Input } from 'antd';

interface MapStateToProps {
  products: Product[];
  loading: boolean;
  tags: string[];
  activeTags: string[];
}
interface MapDispatchToProps {
  getProductsList: () => void;
  setSearchValue: (value: string) => void;
  filterByTags: (tags: string[]) => void;
}

type Props = MapStateToProps &
  MapDispatchToProps;

export class Products extends React.Component<Props> {
  componentDidMount() {
    this.props.getProductsList();
  }
  onSearch = debounce((value: string) =>
    this.props.setSearchValue(value), 500);
  handleChange = (value: string[]) => {
    this.props.filterByTags(value);
  };
  handleDelete = (value: string) => {
    const updatedTags = this.props.activeTags.filter(item => item !== value);
    this.props.filterByTags(updatedTags);
  };
  render() {
    return (
      <>
        <SearchContainer>
          <Input
            placeholder="Szukaj produktów..."
            allowClear
            onChange={({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => this.onSearch(value)}
            suffix={<Search />}
          />
          <Select
            mode="multiple"
            allowClear
            placeholder="Wyszukaj po tagach..."
            onChange={this.handleChange}
            defaultValue={this.props.activeTags}
          >
            {this.props.tags.map(tag =>
              <option key={tag} value={tag}>
                {tag}
              </option>
            )}
          </Select>
        </SearchContainer>
        {this.props.loading ? <UI.Loader centered height={80} width={100} /> : null}
        <ProductsContainer loading={this.props.loading}>
          {this.props.products.length ? this.props.products.map(product =>
            <ProductCard key={product.id} product={product} />
          ) : <p>Przykro nam! :( Nie znaleźliśmy produktów spełniających Twoje kryteria.</p>}
        </ProductsContainer>
      </>
    );
  }
}
const mapStateToProps = (state: RootState): MapStateToProps => ({
  products: getAll(state),
  loading: getLoadingState(state),
  tags: state.products.tags,
  activeTags: state.products.activeTags,
});
const mapDispatchToProps = (dispatch: any): MapDispatchToProps => ({
  getProductsList: () => dispatch(getProductsListStart()),
  setSearchValue: (value: string) => dispatch(setSearchValue(value)),
  filterByTags: (tags: string[]) => dispatch(setActiveTags(tags)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Products);
