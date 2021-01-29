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
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setTables, setActive } = tablesSlice.actions;

export const selectTables = (state) => state.tables.data;
export const selectActive = (state) => state.tables.active;

export default tablesSlice.reducer;
