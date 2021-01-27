import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import productsReducer from './products/reducer';
import cartReducer from './cart/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export interface RootState {
  readonly products: Product.Store;
  readonly cart: Cart.Store;
}

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
