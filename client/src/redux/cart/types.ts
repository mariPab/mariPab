const reducerName = 'CART';
const createActionName = (name: string) => `APP/${reducerName}/${name}`;

export const SUBMIT_ORDER_START = createActionName('SUBMIT_ORDER_START');
export const SUBMIT_ORDER_SUCCESS = createActionName('SUBMIT_ORDER_SUCCESS');
export const SUBMIT_ORDER_FAIL = createActionName('SUBMIT_ORDER_FAIL');

export const ADD_PRODUCT = createActionName('ADD_PRODUCT');
export const CHANGE_PRODUCT_AMOUNT = createActionName('CHANGE_PRODUCT_AMOUNT');
export const ADD_COMMENTS = createActionName('ADD_COMMENTS');
export const UPDATE_ORDER_DATA = createActionName('UPDATE_ORDER_DATA');
export const REMOVE_PRODUCT = createActionName('REMOVE_PRODUCT');
export const UPDATE_TOTAL = createActionName('UPDATE_TOTAL');

export const LOAD_CART_START = createActionName('LOAD_CART_START');
export const LOAD_CART = createActionName('LOAD_CART');
export const SAVE_CART = createActionName('SAVE_CART');

