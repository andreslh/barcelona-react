import { createSlice } from '@reduxjs/toolkit';

export const waitersSlice = createSlice({
  name: 'waiters',
  initialState: {
    data: [],
  },
  reducers: {
    setWaiters: (state, action) => {
      state.data = action.payload;
    },
    deleteWaiter: (state, action) => {
      state.data = state.data.filter((waiter) => waiter.id !== action.payload);
    },
  },
});

export const { setWaiters, deleteWaiter } = waitersSlice.actions;

export const selectWaiters = (state) => state.waiters.data;

export default waitersSlice.reducer;
