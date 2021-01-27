import { productActionTypes} from '.';

export interface GetProductsListStart {
  type: typeof productActionTypes.GET_PRODUCTS_LIST_START;
}
export interface GetProductsListSuccess {
  type: typeof productActionTypes.GET_PRODUCTS_LIST_SUCCESS;
  payload: Product.Product[];
}
export interface SetAvailableTags {
  type: typeof productActionTypes.SET_AVAILABLE_TAGS;
  payload: string[];
}
export interface GetProductsListFail {
  type: typeof productActionTypes.GET_PRODUCTS_LIST_FAIL;
}
export interface GetProductByIdStart {
  type: typeof productActionTypes.GET_PRODUCT_BY_ID_START;
  payload: { id: string; };
}
export interface GetProductByIdSuccess {
  type: typeof productActionTypes.GET_PRODUCT_BY_ID_SUCCESS;
  payload: Product.Product;
}
export interface GetProductByIdFail {
  type: typeof productActionTypes.GET_PRODUCT_BY_ID_FAIL;
}
export interface SetSearchValue {
  type: typeof productActionTypes.SET_SEARCH_VALUE;
  payload: { value: string; };
}
export interface SetActiveTags {
  type: typeof productActionTypes.SET_ACTIVE_TAGS;
  payload: { tags: string[]; };
}
export interface ResetActiveProduct {
  type: typeof productActionTypes.RESET_ACTIVE_PRODUCT;
}
