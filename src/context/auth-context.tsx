import { ReactNode, createContext, useState } from 'react';
import { defaultAuth } from './auth-data';
import { AuthContextProps, AuthState } from './types';

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
