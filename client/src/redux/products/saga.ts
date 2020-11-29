import axios from 'axios';
import { API_URL } from '../../settings/config';
import {
  GET_PRODUCTS_LIST_START,
  GET_PRODUCTS_LIST_FAIL,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
  GET_PRODUCT_BY_ID_START,
  GET_PRODUCT_BY_ID_SUCCESS,
  SET_SEARCH_VALUE,
  SET_AVAILABLE_TAGS,
  INIT_PRODUCTS_FINISH,
} from './actions';
import { Product, GetProductByIdStart, ProductStore } from './types';
import { takeEvery, put, all, fork, select } from 'redux-saga/effects';
import UrlBuilder from '../../utils/urlBuilder';
import { getProductsState } from './reducer';
import CodesHandler from '../../utils/codesHandler';

const { build } = UrlBuilder;

export function* getProductsListWatcher(): Generator {
  yield takeEvery(GET_PRODUCTS_LIST_START, getProductsList);
}
export function* getProductsList() {
  try {
    const { search, init } = (yield select(getProductsState)) as ProductStore;
    const requestParams = { search };
    const address = build(`${API_URL}/products/all`, requestParams);
    const res = yield axios.get(address);
    const data = res.data.map((item: any) => ({
      ...item, id: item._id,
    })) as Product[];
    yield put({ type: GET_PRODUCTS_LIST_SUCCESS, payload: data });
    if (init) {
      const tags: string[] = [];
      data.forEach(item => {
        if (item.tags) {
          item.tags.forEach(tag => tags.push(tag));
        }
      });
      yield put({ type: SET_AVAILABLE_TAGS, payload: tags.filter((item, idx) => tags.indexOf(item) == idx) });
      yield put({ type: INIT_PRODUCTS_FINISH });

    }
  } catch (err) {
    console.log(err);
    yield put({ type: GET_PRODUCTS_LIST_FAIL });
    yield CodesHandler.executeErrorCodes(err.response.data.errorCode);
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

export function* refreshProductsListWatcher(): Generator {
  yield takeEvery([SET_SEARCH_VALUE], refreshProductsList);
}
export function* refreshProductsList() {
  yield put({
    type: GET_PRODUCTS_LIST_START,
  });
}

export default function* rootSaga(): Generator {
  yield all([
    fork(getProductsListWatcher),
    fork(getProductByIdWatcher),
    fork(refreshProductsListWatcher),
  ]);
}
