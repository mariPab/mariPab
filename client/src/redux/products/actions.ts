import {
  GetProductByIdStart,
  GetProductsListStart,
} from './types';

/* action name creator */
const reducerName = 'PRODUCT';
const createActionName = (name: string) => `APP/${reducerName}/${name}`;

/* action types */
export const GET_PRODUCTS_LIST_START = createActionName('GET_PRODUCTS_LIST_START');
export const GET_PRODUCTS_LIST_SUCCESS = createActionName('GET_PRODUCTS_LIST_SUCCESS');
export const GET_PRODUCTS_LIST_FAIL = createActionName('GET_PRODUCTS_LIST_FAIL');

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
export const resetActiveProduct = () => ({
  type: RESET_ACTIVE_PRODUCT,
});

