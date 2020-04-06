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
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const SEND_ORDER = createActionName('SEND_ORDER');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addProductToCart = payload => ({ payload, type: ADD_TO_CART });
export const changeProductAmount = payload => ({ payload, type: CHANGE_AMOUNT });
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
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
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
          if (item._id === action.payload._id) isProductInCart = true;
        }
        return {
          ...statePart,
          products: isProductInCart ? [...products] : [...products, { ...action.payload, amount: 1 }],
          total: isProductInCart ? total : total + action.payload.price,
        };
      } else {
        return {
          ...statePart,
          products: [{ ...action.payload, amount: 1 }],
          total: total + action.payload.price,
        };
      }
    }
    case CHANGE_AMOUNT: {
      return {
        ...statePart,
        products: statePart.products.map(product => {
          if (product._id === action.payload.id) return { ...product, amount: parseInt(action.payload.amount) };
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
