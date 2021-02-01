import { createSlice } from '@reduxjs/toolkit';

export const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    data: [],
    active: {},
  },
  reducers: {
    setTables: (state, action) => {
      state.data = action.payload;
    },
    deleteTable: (state, action) => {
      state.data = state.data.filter(
        (table) => table.id.toString() !== action.payload
      );
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    clearActive: (state) => {
      state.active = {};
    },
  },
});

export const {
  setTables,
  setActive,
  clearActive,
  deleteTable,
} = tablesSlice.actions;

export const selectTables = (state) => state.tables.data;
export const selectActive = (state) => state.tables.active;

export default tablesSlice.reducer;
