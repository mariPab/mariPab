import { productActionsInterfaces, productActionTypes} from '.';

export const getProductsListStart =
  (): productActionsInterfaces.GetProductsListStart => ({
  type: productActionTypes.GET_PRODUCTS_LIST_START,
});
export const getProductByIdStart =
  (id: string): productActionsInterfaces.GetProductByIdStart => ({
  type: productActionTypes.GET_PRODUCT_BY_ID_START,
  payload: { id },
});
export const setSearchValue =
  (value: string): productActionsInterfaces.SetSearchValue => ({
  type: productActionTypes.SET_SEARCH_VALUE,
  payload: { value },
});
export const setActiveTags =
  (tags: string[]): productActionsInterfaces.SetActiveTags => ({
  type: productActionTypes.SET_ACTIVE_TAGS,
  payload: { tags },
});
export const resetActiveProduct =
  (): productActionsInterfaces.ResetActiveProduct => ({
  type: productActionTypes.RESET_ACTIVE_PRODUCT,
});

