import { Dispatch, SetStateAction } from 'react';

export type AuthState = {
  isAuthenticated: boolean;
  username: string;
};

export type AuthContextProps = AuthState & {
  setAuth: Dispatch<SetStateAction<AuthState>>;
};
