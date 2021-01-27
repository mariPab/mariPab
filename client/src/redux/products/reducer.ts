import { AnyAction } from 'redux';
import { productActionsInterfaces, productActionTypes } from '.';

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
    case productActionTypes.GET_PRODUCTS_LIST_START:
    case productActionTypes.GET_PRODUCT_BY_ID_START: {
      return {
        ...statePart,
        loading: true,
        error: false,
      };
    }
    case productActionTypes.GET_PRODUCTS_LIST_SUCCESS: {
      const { payload } = action as productActionsInterfaces.GetProductsListSuccess;
      return {
        ...statePart,
        loading: false,
        error: false,
        data: payload,
      };
    }
    case productActionTypes.SET_AVAILABLE_TAGS:
      const { payload } = action as productActionsInterfaces.SetAvailableTags;
      return {
        ...statePart,
        tags: payload,
      };
    case productActionTypes.INIT_PRODUCTS_FINISH:
      return {
        ...statePart,
        init: false,
      };
    case productActionTypes.GET_PRODUCT_BY_ID_SUCCESS: {
      const { payload } = action as productActionsInterfaces.GetProductByIdSuccess;
      return {
        ...statePart,
        loading: false,
        error: false,
        activeProduct: payload,
      };
    }
    case productActionTypes.SET_SEARCH_VALUE: {
      const { payload } = action as productActionsInterfaces.SetSearchValue;
      return {
        ...statePart,
        search: payload.value,
      };
    }
    case productActionTypes.SET_ACTIVE_TAGS: {
      const { payload } = action as productActionsInterfaces.SetActiveTags;
      return {
        ...statePart,
        activeTags: payload.tags,
      };
    }
    case productActionTypes.GET_PRODUCT_BY_ID_FAIL:
    case productActionTypes.GET_PRODUCTS_LIST_FAIL:
      return {
        ...statePart,
        loading: false,
        error: true,
      };
    case productActionTypes.RESET_ACTIVE_PRODUCT:
      return {
        ...statePart,
        activeProduct: null,
      };
    default:
      return statePart;
  }
}
