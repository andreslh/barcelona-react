import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    resetProducts: (state) => {
      state.data = [];
    },
  },
});

export const { setProducts, resetProducts } = productsSlice.actions;

export const selectProducts = (state) => state.products.data;

export default productsSlice.reducer;
