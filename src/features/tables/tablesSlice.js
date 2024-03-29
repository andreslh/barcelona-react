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
      state.data = state.data.filter((table) => table.id !== action.payload);
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    updateActiveName: (state, action) => {
      state.active.name = action.payload;
    },
    deleteTableProduct: (state, action) => {
      const productToDeleteTotal = state.active.Tableproducts.find(
        (product) => product.id === action.payload
      ).total;
      state.active = {
        ...state.active,
        Tableproducts: state.active.Tableproducts.filter(
          (product) => product.id !== action.payload
        ),
        total: state.active.total - productToDeleteTotal,
      };
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
  deleteTableProduct,
  updateActiveName,
} = tablesSlice.actions;

export const selectTables = (state) => state.tables.data;
export const selectActive = (state) => state.tables.active;

export default tablesSlice.reducer;
