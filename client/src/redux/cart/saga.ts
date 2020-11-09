import axios from "axios";
import { API_URL } from "../../settings/config";
import {
  SUBMIT_ORDER_FAIL,
  SUBMIT_ORDER_START,
  SUBMIT_ORDER_SUCCESS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_TOTAL,
  SAVE_CART,
  LOAD_CART,
  LOAD_CART_START,
} from "./actions";
import { /* OrderPayload, CartProduct,  */CartStore } from "./types";
import { getCart } from "./reducer";
// import { Product, ProductBasic } from "../products/types";
// import ErrorHandler from '../../utils/codesHandler';
import { select, takeEvery, put, all, fork } from "redux-saga/effects";
import { /* codes, */ errorCodes } from "../../settings/codes";

export function* updateTotalWatcher(): Generator {
  yield takeEvery([ADD_PRODUCT, REMOVE_PRODUCT], updateTotal);
}
export function* updateTotal() {
  yield put({ type: UPDATE_TOTAL});
}

export function* submitOrderWatcher(): Generator {
  yield takeEvery(SUBMIT_ORDER_START, submitOrder);
}
export function* submitOrder() {
  const { products, customer, total } = (yield select(getCart)) as CartStore;
  try {
    const orderAttributes = {
      products: products.map(product => ({
          _id: product.id,
          amount: product.amount,
          notes: product.notes,
        })),
        customer,
        total,
    };
    const res = yield axios.post(`${API_URL}/order/submit`, orderAttributes, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res && res.data) {
      yield put({ type: SUBMIT_ORDER_SUCCESS, payload: res.data });
    }
  }
  catch (err) {
    console.log(err.data);
    yield put({
      type: SUBMIT_ORDER_FAIL,
    });
    if(err.data.errorCode === errorCodes.VALIDATION_FAILED) {
      // TODO:
    }
  }
}

export function* saveCartWatcher(): Generator {
  yield takeEvery(SAVE_CART, saveCart);
}
export function* saveCart() {
  const { products } = (yield select(getCart)) as CartStore;
  localStorage.setItem("cart", JSON.stringify(products));
}

export function* loadCartWatcher(): Generator {
  yield takeEvery(LOAD_CART_START, loadCart);
}
export function* loadCart() {
  const savedCart = localStorage.getItem("cart");
  yield put({
    type: LOAD_CART,
    payload: savedCart ? JSON.parse(savedCart) : [],
  });
}

export default function* rootSaga(): Generator {
  yield all([
    fork(updateTotalWatcher),
    fork(submitOrderWatcher),
    fork(saveCartWatcher),
    fork(loadCartWatcher),
    fork(submitOrderWatcher),
  ]);
};
