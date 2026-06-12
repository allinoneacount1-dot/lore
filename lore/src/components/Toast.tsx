import React, { createContext, useContext, ReactNode } from 'react';

interface ToastContextType {
  showToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType>({});

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ToastContext.Provider value={{}}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
