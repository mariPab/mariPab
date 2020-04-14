import axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getCart = ({ cart }) => cart;
export const getProductFromCart = ({ cart }, productId) => cart.products.filter(product => product._id === productId)[0];
export const getTotalPrice = ({ cart }) => cart.products.reduce((total, product) => product.price * product.amount + total, 0);

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_TO_CART = createActionName('ADD_TO_CART');
const CHANGE_AMOUNT = createActionName('CHANGE_AMOUNT');
const ADD_NOTES = createActionName('ADD_NOTES');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const SEND_ORDER = createActionName('SEND_ORDER');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addProductToCart = payload => ({ payload, type: ADD_TO_CART });
export const changeProductAmount = payload => ({ payload, type: CHANGE_AMOUNT });
export const addOrderNotes = payload => ({ payload, type: ADD_NOTES });
export const removeFromCart = payload => ({ payload, type: REMOVE_FROM_CART });
export const sendOrder = payload => ({ payload, type: SEND_ORDER });

/* thunk creators */
export const newOrderRequest = data => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.post(
        `${API_URL}/order`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(sendOrder(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

/* thunk creators */
export const saveCartRequest = data => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.post(
        `${API_URL}/cart`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(fetchSuccess(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

export const loadCartRequest = () => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.get(`${API_URL}/cart`, {
        headers: {
          withCredentials: true,
        },
      });
      dispatch(fetchSuccess(res.data));
    } catch (e) {
      dispatch(fetchError(e.message || true));
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      console.log(action.payload);
      return {
        ...statePart,
        products: /* action.payload ?  */action.payload/*  : [] */,
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_TO_CART: {
      const { products, total } = statePart;
      if (products.length) {
        let isProductInCart = false;
        for (let item of products) {
          if (item._id === action.payload.product._id) isProductInCart = true;
        }
        return {
          ...statePart,
          products: isProductInCart ? [...products] : [...products, { ...action.payload.product, amount: action.payload.amount }],
          total: isProductInCart ? total : total + action.payload.price,
        };
      } else {
        return {
          ...statePart,
          products: [{ ...action.payload.product, amount: action.payload.amount }],
          total: total + action.payload.price,
        };
      }
    }
    case CHANGE_AMOUNT: {
      return {
        ...statePart,
        products: statePart.products.map(product => {
          if (product._id === action.payload.id) return { ...product, amount: action.payload.amount };
          else return product;
        }),
        total: statePart.total,
      };
    }
    case ADD_NOTES: {
      return {
        ...statePart,
        products: statePart.products.map(product => {
          if (product._id === action.payload.id) return { ...product, notes: action.payload.notes };
          else return product;
        }),
        total: statePart.total,
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...statePart,
        products: statePart.products.filter(product => product._id !== action.payload._id),
        total: statePart.total,
      };
    }
    case SEND_ORDER: {
      return {
        ...statePart,
        products: [],
        total: 0,
      };
    }
    default:
      return statePart;
  }
};
