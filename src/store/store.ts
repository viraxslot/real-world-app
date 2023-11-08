import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from './reducers/loginStatus';
import userProfileReducer from './reducers/userProfile';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedLoginStatusReducer = persistReducer(persistConfig, loginStatusReducer);
const persistedUserProfileReducer = persistReducer(persistConfig, userProfileReducer);

export const store = configureStore({
  reducer: {
    loginStatus: persistedLoginStatusReducer,
    userProfile: persistedUserProfileReducer,
  },
  // fixes problem with non-serializable value
  // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
