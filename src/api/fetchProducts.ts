import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../store/products/types";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data as Product[];
});