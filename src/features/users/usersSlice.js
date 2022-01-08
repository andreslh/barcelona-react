import { createSlice } from '@reduxjs/toolkit';

import { ACCESS_TOKEN, REFRESH_TOKEN, STORED_ROLE } from '../../app/constants';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    accessToken: '',
    refreshToken: '',
    role: null,
    forceLogin: false,
    usersByRole: [],
  },
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken, role } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.role = role;
      state.forceLogin = false;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORED_ROLE, role);
    },
    logout: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.role = null;
      state.forceLogin = false;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(STORED_ROLE);
    },
    updateAccessToken: (state, action) => {
      const accessToken = action.payload;
      state.accessToken = accessToken;
      state.forceLogin = false;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
    },
    setUsersByRole: (state, action) => {
      state.usersByRole = action.payload;
    },
    forceLogin: (state) => {
      state.forceLogin = true;
    },
  },
});

export const {
  setTokens,
  login,
  logout,
  updateAccessToken,
  forceLogin,
  setUsersByRole,
} = usersSlice.actions;

export const selectTokens = (state) => ({
  accessToken: state.users.accessToken || localStorage.getItem(ACCESS_TOKEN),
  refreshToken: state.users.refreshToken || localStorage.getItem(REFRESH_TOKEN),
});
export const selectRole = (state) =>
  state.users.role || localStorage.getItem(STORED_ROLE);
export const selectUserByRole = (state) => state.users.usersByRole;
export const selectForceLogin = (state) => state.users.forceLogin;

export default usersSlice.reducer;
