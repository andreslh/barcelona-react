import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tablesReducer from '../features/tables/tablesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    tables: tablesReducer,
  },
});
