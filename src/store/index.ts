import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/index';

const ACTIONS_TO_SAVE = [
  'products/addToSelected',
  'products/removeFromSelected',
  'products/changeQuantity',
];

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  if (ACTIONS_TO_SAVE.includes(action.type)) {
    const currentCart = store.getState().products.selectedProductsIds;
    console.log(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  return result;
};

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;

export default store;
