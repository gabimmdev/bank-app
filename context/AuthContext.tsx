import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync('jwt').then(saved => {
      if (saved) setToken(saved);
    });
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    await SecureStore.setItemAsync('jwt', newToken);
  };

  const logout = async () => {
    setToken(null);
    await SecureStore.deleteItemAsync('jwt');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
