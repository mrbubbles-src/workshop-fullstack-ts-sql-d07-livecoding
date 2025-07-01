import { MemodexProviderContext } from '@/hooks/use-memodex';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type MemodexProviderProps = {
  children: React.ReactNode;
};

export interface Operator {
  operator_name: string;
  role: string;
  memory_level: number;
}

export function MemodexProvider({ children }: MemodexProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [operator, setOperator] = useState<Operator | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_HQ}/operator/data`, {
          method: 'POST',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setOperator({
            operator_name: data.operator_name,
            role: data.role,
            memory_level: data.memory_level,
          });
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoggedIn(false);
          setIsLoading(false);
          setOperator(null);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate('/memory-level');
    setTimeout(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_HQ}/operator/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        if (res.ok) {
          setIsLoggedIn(false);
          setOperator(null);
          setIsLoading(false);
          navigate('/login');
          toast.success('Session erfolgreich beendet.');
        } else {
          toast.error('Session konnte nicht beendet werden.');
        }
      } catch (error) {
        console.error('Error during logout:', error);
        toast.error(
          'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
        );
        setIsLoading(false);
      }
    }, 10000);
  };

  return (
    <MemodexProviderContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        operator,
        setOperator,
        isLoading,
        setIsLoading,
        handleLogout,
      }}>
      {children}
    </MemodexProviderContext.Provider>
  );
}
