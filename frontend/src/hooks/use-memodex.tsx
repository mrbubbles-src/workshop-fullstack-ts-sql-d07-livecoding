import type { Operator } from '@/context/memodex-provider';
import { createContext, useContext } from 'react';

interface MemodexContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  operator: Operator | null;
  setOperator: (operator: Operator | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  handleLogout: () => Promise<void>;
}

export const MemodexProviderContext = createContext<
  MemodexContextType | undefined
>(undefined);

export const useMemodex = () => {
  const context = useContext(MemodexProviderContext);

  if (context === undefined) {
    throw new Error('useMemodex must be used within a MemodexProvider');
  }

  return context;
};
