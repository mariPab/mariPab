import axios from 'axios';
import { API_URL } from '../../settings/config';
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
} from './actions';
import { SubmitOrderStart } from './types';
import { getCart } from './reducer';
import CodesHandler from '../../helpers/codesHandler';
import { select, takeEvery, put, all, fork, delay } from 'redux-saga/effects';
import { errorCodes, codes } from '../../settings/codes';
import { AnyAction } from 'redux';

export function* updateTotalWatcher(): Generator {
  yield takeEvery([ADD_PRODUCT, REMOVE_PRODUCT, LOAD_CART], updateTotal);
}
export function* updateTotal({ type }: AnyAction) {
  yield put({ type: UPDATE_TOTAL });
  if (type === ADD_PRODUCT) {
    yield CodesHandler.executeSuccessCode(codes.SUCCESSFULLY_ADDED_TO_CART);
  } else if (type === REMOVE_PRODUCT) {
    yield CodesHandler.executeSuccessCode(codes.SUCCESSFULLY_REMOVED_FROM_CART);
  }
}

export function* submitOrderWatcher(): Generator {
  yield takeEvery(SUBMIT_ORDER_START, submitOrder);
}
export function* submitOrder({ payload }: SubmitOrderStart) {
  const { products, total } = (yield select(getCart)) as Cart.Store;
  try {
    const orderAttributes = {
      products: products.map(product => ({
        _id: product.id,
        amount: product.amount,
        notes: product.notes,
      })),
      customer: payload.customer,
      total,
    };
    const res = yield axios.post(`${API_URL}/order/submit`, orderAttributes);
    if (res && res.data) {
      yield CodesHandler.executeSuccessCode(res.data.code);
      yield delay(3000);
      yield put({ type: SUBMIT_ORDER_SUCCESS });
      yield localStorage.removeItem('cart');
    }
  }
  catch (err) {
    const { data } = err.response;
    yield put({
      type: SUBMIT_ORDER_FAIL,
    });
    if(data.errorCode === errorCodes.VALIDATION_FAILED) {
      for (const code of data.validationErrors) {
        yield CodesHandler.executeErrorCodes(code);
      }
    } else {
      yield CodesHandler.executeErrorCodes(err.errorCode);
    }
  }
}

export function* saveCartWatcher(): Generator {
  yield takeEvery(SAVE_CART, saveCart);
}
export function* saveCart() {
  const { products } = (yield select(getCart)) as Cart.Store;
  localStorage.setItem('cart', JSON.stringify(products));
}

export function* loadCartWatcher(): Generator {
  yield takeEvery(LOAD_CART_START, loadCart);
}
export function* loadCart() {
  const savedCart = localStorage.getItem('cart');
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
  ]);
}
