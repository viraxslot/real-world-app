import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { defaultUsername } from '../../shared/constants';

export type UserProfileState = {
  username: string;
};

const initialState: UserProfileState = {
  username: defaultUsername,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfileState>) => {
      state.username = action.payload.username;
    },
    removeProfile: (state) => {
      state.username = defaultUsername;
    },
  },
});

export const selectUsername = (state: RootState) => state.userProfile.username;
export const { setProfile, removeProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
