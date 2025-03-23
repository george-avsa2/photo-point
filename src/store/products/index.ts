import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from './types';
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
    addToSelected: (state, action: PayloadAction<number>) => {
        const productId = action.payload;
        if (!state.selectedProductsIds.find((id) => id === productId)) {
          state.selectedProductsIds.push(productId);
        }
      },
      removeFromSelected: (state, action: PayloadAction<number>) => {
        state.selectedProductsIds = state.selectedProductsIds.filter(
          (id) => id !== action.payload
        );
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default productsSlice.reducer;
export { fetchProducts };
