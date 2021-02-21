import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from '../features/tables/tablesSlice';
import productsReducer from '../features/products/productsSlice';
import usersReducer from '../features/users/usersSlice';
import waitersReducer from '../features/waiters/waitersSlice';
import closedTablesReducer from '../features/closedTables/closedTablesSlice';

export default configureStore({
  reducer: {
    tables: tablesReducer,
    products: productsReducer,
    users: usersReducer,
    waiters: waitersReducer,
    closedTables: closedTablesReducer,
  },
});
