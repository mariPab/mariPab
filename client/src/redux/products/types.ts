const reducerName = 'PRODUCT';
const createActionName = (name: string) => `APP/${reducerName}/${name}`;

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
