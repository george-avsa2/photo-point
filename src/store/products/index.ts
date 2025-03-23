import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CardProduct, Product, ProductsState } from './types';
import { fetchProducts } from '../../api/fetchProducts';

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  selectedProductsIds: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToSelected: (state, { payload: selectedId }: PayloadAction<number>) => {
      if (
        !state.selectedProductsIds.find(
          (cardProduct) => cardProduct.id === selectedId
        )
      ) {
        state.selectedProductsIds.push({ id: selectedId, quantity: 1 });
      }
    },
    removeFromSelected: (
      state,
      { payload: selectedId }: PayloadAction<number>
    ) => {
      state.selectedProductsIds = state.selectedProductsIds.filter(
        (cardProduct) => cardProduct.id !== selectedId
      );
    },
    changeQuantity: (
      state,
      { payload: { id, quantity } }: PayloadAction<CardProduct>
    ) => {
      state.selectedProductsIds = state.selectedProductsIds.map(
        (cardProduct) => {
          if (id === cardProduct.id) {
            return { ...cardProduct, quantity };
          }
          return cardProduct;
        }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'idle';
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { addToSelected, removeFromSelected, changeQuantity } =
  productsSlice.actions;

export default productsSlice.reducer;
export { fetchProducts };
