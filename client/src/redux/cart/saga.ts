import axios from 'axios';
import { API_URL } from '../../settings/config';
import { cartActionTypes, cartActionsInterfaces, cartSelectors } from '.';
import CodesHandler from '../../helpers/codesHandler';
import { select, takeEvery, put, all, fork, delay } from 'redux-saga/effects';
import { errorCodes, codes } from '../../settings/codes';
import { AnyAction } from 'redux';

export function* updateTotalWatcher(): Generator {
  yield takeEvery([
    cartActionTypes.ADD_PRODUCT,
    cartActionTypes.REMOVE_PRODUCT,
    cartActionTypes.LOAD_CART
  ], updateTotal);
}
export function* updateTotal({ type }: AnyAction) {
  yield put({ type: cartActionTypes.UPDATE_TOTAL });
  if (type === cartActionTypes.ADD_PRODUCT) {
    yield CodesHandler.executeSuccessCode(codes.SUCCESSFULLY_ADDED_TO_CART);
  } else if (type === cartActionTypes.REMOVE_PRODUCT) {
    yield CodesHandler.executeSuccessCode(codes.SUCCESSFULLY_REMOVED_FROM_CART);
  }
}

export function* submitOrderWatcher(): Generator {
  yield takeEvery(cartActionTypes.SUBMIT_ORDER_START, submitOrder);
}
export function* submitOrder({ payload }: cartActionsInterfaces.SubmitOrderStart) {
  const { products, total } = (yield select(cartSelectors.getCart)) as Cart.Store;
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
      yield put({ type: cartActionTypes.SUBMIT_ORDER_SUCCESS });
      yield localStorage.removeItem('cart');
    }
  }
  catch (err) {
    const { data } = err.response;
    yield put({
      type: cartActionTypes.SUBMIT_ORDER_FAIL,
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
  yield takeEvery(cartActionTypes.SAVE_CART, saveCart);
}
export function* saveCart() {
  const { products } = (yield select(cartSelectors.getCart)) as Cart.Store;
  localStorage.setItem('cart', JSON.stringify(products));
}

export function* loadCartWatcher(): Generator {
  yield takeEvery(cartActionTypes.LOAD_CART_START, loadCart);
}
export function* loadCart() {
  const savedCart = localStorage.getItem('cart');
  yield put({
    type: cartActionTypes.LOAD_CART,
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
