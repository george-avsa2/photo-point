import { configureStore } from '@reduxjs/toolkit';
import productsReducer from "./products/index"

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>

export default store;
