import { createSlice } from '@reduxjs/toolkit';

export const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    data: [],
  },
  reducers: {
    fetch: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetch } = tablesSlice.actions;

export const selectTables = (state) => state.tables.data;

export default tablesSlice.reducer;
