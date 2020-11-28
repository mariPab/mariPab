import axios from 'axios';
import { API_URL } from '../../settings/config';
import {
  GET_PRODUCTS_LIST_START,
  GET_PRODUCTS_LIST_FAIL,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_START,
  GET_PRODUCT_BY_ID_SUCCESS,
} from './actions';
import { Product, GetProductByIdStart } from './types';
import { takeEvery, put, all, fork } from 'redux-saga/effects';

export function* getProductsListWatcher(): Generator {
  yield takeEvery(GET_PRODUCTS_LIST_START, getProductsList);
}
export function* getProductsList() {
  try {
    const res = yield axios.get(`${API_URL}/products/all`);
    const data = res.data.map((item: any) => ({
      ...item, id: item._id,
    })) as Product[];
    yield put({ type: GET_PRODUCTS_LIST_SUCCESS, payload: data });
  } catch (e) {
    console.log(e);
    yield put({ type: GET_PRODUCTS_LIST_FAIL});
  }
}

export function* getProductByIdWatcher(): Generator {
  yield takeEvery(GET_PRODUCT_BY_ID_START, getProductById);
}
export function* getProductById({ payload }: GetProductByIdStart) {
  try {
    const res = yield axios.get(`${API_URL}/products/product/${payload.id}`);
    const data = { ...res.data, id: res.data._id };
    delete data._id;
    yield put({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: GET_PRODUCT_BY_ID_FAIL });
  }
}

export default function* rootSaga(): Generator {
  yield all([
    fork(getProductsListWatcher),
    fork(getProductByIdWatcher),
  ]);
}
