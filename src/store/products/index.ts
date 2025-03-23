import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from './types';
import { fetchProducts } from '../../api/fetchProducts';

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  try {
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};


const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  selectedProductsIds: loadCartFromLocalStorage(),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToSelected: (state, { payload: selectedId }: PayloadAction<number>) => {
      const selectedProduct = state.selectedProductsIds.find(
        (cardProduct) => cardProduct.id === selectedId
      );
      const product = state.products.find(
        (product) => product.id === selectedId
      );
      if (product) {
        if (!selectedProduct) {
          state.selectedProductsIds.push({ ...product, quantity: 1 });
        } else {
          state.selectedProductsIds = state.selectedProductsIds.map(
            (product) => {
              if (selectedId === product.id) {
                return { ...product, quantity: product.quantity + 1 };
              }
              return product;
            }
          );
        }
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
      { payload: { id, quantity } }: PayloadAction<{id: number, quantity: number}>
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
