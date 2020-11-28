import {
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_START,
  GET_PRODUCT_BY_ID_START,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCTS_LIST_FAIL,
  GET_PRODUCT_BY_ID_FAIL,
  RESET_ACTIVE_PRODUCT,
} from './actions';

export interface ProductBasic {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
}

export interface Product extends ProductBasic {
  tags?: string[];
}
export interface ProductStore {
  data: Product[];
  loading: boolean;
  error: boolean;
  activeProduct: Product | null;
}
export interface GetProductsListStart {
  type: typeof GET_PRODUCTS_LIST_START;
}
export interface GetProductsListSuccess {
  type: typeof GET_PRODUCTS_LIST_SUCCESS;
  payload: Product[];
}
export interface GetProductsListFail {
  type: typeof GET_PRODUCTS_LIST_FAIL;
}
export interface GetProductByIdStart {
  type: typeof GET_PRODUCT_BY_ID_START;
  payload: { id: string; };
}
export interface GetProductByIdSuccess {
  type: typeof GET_PRODUCT_BY_ID_SUCCESS;
  payload: Product;
}
export interface GetProductByIdFail {
  type: typeof GET_PRODUCT_BY_ID_FAIL;
}
export interface ResetActiveProduct {
  type: typeof RESET_ACTIVE_PRODUCT;
}
export type ProductReducerActionTypes =
  | GetProductsListStart
  | GetProductsListSuccess
  | GetProductsListFail
  | GetProductByIdStart
  | GetProductByIdSuccess
  | GetProductByIdFail;
