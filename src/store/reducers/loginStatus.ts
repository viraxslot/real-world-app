import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const selectLoginStatus = (state: RootState) => state.loginStatus.loggedIn;
export const { login, logout } = loginStatusSlice.actions;
export default loginStatusSlice.reducer;
