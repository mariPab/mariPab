import {
  GetProductByIdStart,
  GetProductsListStart,
  SetSearchValue,
} from './types';

/* action name creator */
const reducerName = 'PRODUCT';
const createActionName = (name: string) => `APP/${reducerName}/${name}`;

/* action types */
export const INIT_PRODUCTS_FINISH = createActionName('INIT_PRODUCTS_FINISH');

export const GET_PRODUCTS_LIST_START = createActionName('GET_PRODUCTS_LIST_START');
export const GET_PRODUCTS_LIST_SUCCESS = createActionName('GET_PRODUCTS_LIST_SUCCESS');
export const GET_PRODUCTS_LIST_FAIL = createActionName('GET_PRODUCTS_LIST_FAIL');

export const SET_AVAILABLE_TAGS = createActionName('SET_AVAILABLE_TAGS');
export const SET_ACTIVE_TAGS = createActionName('SET_ACTIVE_TAGS');

export const SET_SEARCH_VALUE = createActionName('SET_SEARCH_VALUE');

export const GET_PRODUCT_BY_ID_START = createActionName('GET_PRODUCT_BY_ID_START');
export const GET_PRODUCT_BY_ID_SUCCESS = createActionName('GET_PRODUCT_BY_ID_SUCCESS');
export const GET_PRODUCT_BY_ID_FAIL = createActionName('GET_PRODUCT_BY_ID_FAIL');

export const RESET_ACTIVE_PRODUCT = createActionName('RESET_ACTIVE_PRODUCT');

/* action creators */
export const getProductsListStart = (): GetProductsListStart => ({
  type: GET_PRODUCTS_LIST_START,
});
export const getProductByIdStart = (id: string): GetProductByIdStart => ({
  type: GET_PRODUCT_BY_ID_START,
  payload: { id },
});
export const setSearchValue = (value: string): SetSearchValue  => ({
  type: SET_SEARCH_VALUE,
  payload: { value },
});
export const resetActiveProduct = () => ({
  type: RESET_ACTIVE_PRODUCT,
});

