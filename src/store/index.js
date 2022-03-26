import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CategoryReducer from './Category/Category.reducer';
import CurrencyReducer from './Currency/Currency.reducer';
import ProductReducer from './Product/Product.reducer';
import CartReducer from './Cart/Cart.reducer';

const reducersList = {
  CategoryReducer,
  ProductReducer,
  CurrencyReducer,
  CartReducer,
};

const rootReducer = combineReducers(reducersList);

const persistConfig = {
  key: 'awesome-storage',
  storage,
  whitelist: ['CartReducer', 'CurrencyReducer'], // Only cart and currency data will be stored.
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);
const persistor = persistStore(store);

export { persistor, store };
