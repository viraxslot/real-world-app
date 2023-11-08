import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const selectLoginStatus = (state: RootState) => state.loginStatus.value;
export const { login, logout } = loginStatusSlice.actions;
export default loginStatusSlice.reducer;
