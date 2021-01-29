import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from '../features/tables/tablesSlice';
import productsReducer from '../features/products/productsSlice';

export default configureStore({
  reducer: {
    tables: tablesReducer,
    products: productsReducer,
  },
});
