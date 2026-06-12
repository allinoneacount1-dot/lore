'use client';

import React, { createContext, useContext, type ReactNode } from 'react';

interface AuthContextType {
  user?: any;
  isLoading?: boolean;
}

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ isLoading: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
