import React from 'react';
import { connect } from 'react-redux';
import { getProductsListStart, setSearchValue, setActiveTags } from '../../../redux/products/actions';
import { getAll, getLoadingState } from '../../../redux/products/reducer';
import ProductCard from '../../features/ProductCard';
import Loader from '../../common/Loader/Loader.style';
import { RootState } from '../../../redux/store';
import { Product } from '../../../redux/products/types';
import {
  ProductsContainer,
  SearchContainer,
  SearchField,
  Chip,
} from './Products.style';
import {
  InputAdornment,
  Select,
  Input,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import debounce from 'debounce';

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
  handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.props.filterByTags(event.target.value as string[]);
  };
  handleDelete = (value: string) => {
    const updatedTags = this.props.activeTags.filter(item => item !== value);
    this.props.filterByTags(updatedTags);
  };
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
          <InputLabel htmlFor="tags">Tag</InputLabel>
          <Select
            id="tags"
            multiple
            value={this.props.activeTags}
            onChange={this.handleChange}
            input={<Input />}
            renderValue={() => (
              <div>
                {this.props.activeTags.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={this.handleDelete.bind(null, tag)}
                    onMouseDown={event => { event.stopPropagation();}}
                  />
                ))}
              </div>
            )}
          >
            {this.props.tags.map(tag =>
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            )}
          </Select>
        </SearchContainer>
        {this.props.loading ? <Loader position='center' height={80} width={100} /> : null}
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
