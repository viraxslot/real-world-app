import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from './reducers/loginStatus';
import userProfileReducer from './reducers/userProfile';

export const store = configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
