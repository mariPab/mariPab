import { ProductStore, ProductReducerActionTypes } from './types';
import {
  GET_PRODUCTS_LIST_START,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAIL,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_START,
  RESET_ACTIVE_PRODUCT,
  SET_SEARCH_VALUE,
} from './actions';
import {
  GetProductByIdSuccess,
  GetProductsListSuccess,
  SetSearchValue,
} from './types';
import { RootState } from '../store';

/* selectors */
export const getAll = ({ products }: RootState) => products.data;
export const getLoadingState = ({ products }: RootState) => products.loading;
export const getActiveProduct = ({ products }: RootState) => products.activeProduct;

const initState: ProductStore = {
  data: [],
  loading: false,
  search: '',
  error: false,
  activeProduct: null,
};

export default function productsReducer(
  statePart: ProductStore = initState,
  action: ProductReducerActionTypes
): ProductStore {
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
