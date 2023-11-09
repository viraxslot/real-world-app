import { createContext } from 'react';
import { defaultUsername } from '../shared/constants';

export type AuthContextProps = {
  isAuthenticated: boolean;
  username: string;
};

export const defaultAuth = {
  isAuthenticated: false,
  username: defaultUsername,
};

export const AuthContext = createContext<AuthContextProps>(defaultAuth);
