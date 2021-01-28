import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from '../features/tables/tablesSlice';

export default configureStore({
  reducer: {
    tables: tablesReducer,
  },
});
