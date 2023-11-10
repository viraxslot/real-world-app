import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { defaultUsername } from '../shared/constants';

export type AuthState = {
  isAuthenticated: boolean;
  username: string;
};

export type AuthContextProps = AuthState & {
  setAuth: Dispatch<SetStateAction<AuthState>>;
};

export const defaultAuth = {
  isAuthenticated: false,
  username: defaultUsername,
};

const AuthContext = createContext<AuthContextProps>({ ...defaultAuth, setAuth: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ ...defaultAuth });
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: auth?.isAuthenticated, username: auth.username, setAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
