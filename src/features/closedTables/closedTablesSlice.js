import { createSlice } from '@reduxjs/toolkit';

export const closedTablesSlice = createSlice({
  name: 'closedTables',
  initialState: {
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  },
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload.date;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload.date;
    },
  },
});

export const { setStartDate, setEndDate } = closedTablesSlice.actions;

export const selectStartDate = (state) => state.closedTables.startDate;
export const selectEndDate = (state) => state.closedTables.endDate;

export default closedTablesSlice.reducer;
