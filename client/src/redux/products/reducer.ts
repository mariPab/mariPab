import {
  GET_PRODUCTS_LIST_START,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAIL,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_START,
  RESET_ACTIVE_PRODUCT,
  SET_SEARCH_VALUE,
  SET_AVAILABLE_TAGS,
  INIT_PRODUCTS_FINISH,
  SET_ACTIVE_TAGS,
} from './actions';
import {
  GetProductByIdSuccess,
  GetProductsListSuccess,
  SetSearchValue,
  SetAvailableTags,
  SetActiveTags,
} from './types';
import { RootState } from '../store';
import { AnyAction } from 'redux';

/* selectors */
export const getAll = ({ products }: RootState) => products.data;
export const getLoadingState = ({ products }: RootState) => products.loading;
export const getActiveProduct = ({ products }: RootState) => products.activeProduct;
export const getProductsState = ({ products }: RootState) => products;

const initState: Product.Store = {
  init: true,
  data: [],
  loading: false,
  search: '',
  tags: [],
  activeTags: [],
  error: false,
  activeProduct: null,
};

export default function productsReducer(
  statePart: Product.Store = initState,
  action: AnyAction
): Product.Store {
  switch (action.type) {
    case GET_PRODUCTS_LIST_START:
    case GET_PRODUCT_BY_ID_START: {
      return {
        ...statePart,
        loading: true,
        error: false,
      };
    }
    case GET_PRODUCTS_LIST_SUCCESS: {
      const { payload } = action as GetProductsListSuccess;
      return {
        ...statePart,
        loading: false,
        error: false,
        data: payload,
      };
    }
    case SET_AVAILABLE_TAGS:
      const { payload } = action as SetAvailableTags;
      return {
        ...statePart,
        tags: payload,
      };
    case INIT_PRODUCTS_FINISH:
      return {
        ...statePart,
        init: false,
      };
    case GET_PRODUCT_BY_ID_SUCCESS: {
      const { payload } = action as GetProductByIdSuccess;
      return {
        ...statePart,
        loading: false,
        error: false,
        activeProduct: payload,
      };
    }
    case SET_SEARCH_VALUE: {
      const { payload } = action as SetSearchValue;
      return {
        ...statePart,
        search: payload.value,
      };
    }
    case SET_ACTIVE_TAGS: {
      const { payload } = action as SetActiveTags;
      return {
        ...statePart,
        activeTags: payload.tags,
      };
    }
    case GET_PRODUCT_BY_ID_FAIL:
    case GET_PRODUCTS_LIST_FAIL:
      return {
        ...statePart,
        loading: false,
        error: true,
      };
    case RESET_ACTIVE_PRODUCT:
      return {
        ...statePart,
        activeProduct: null,
      };
    default:
      return statePart;
  }
}
