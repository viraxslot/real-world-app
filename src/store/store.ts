import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from './reducers/loginStatus';

export const store = configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
