import LoginForm from '@/components/layout/login/login-form';
import Loading from '@/components/ui/loading';
import { useMemodex } from '@/hooks/use-memodex';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { isLoggedIn, isLoading } = useMemodex();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate('/');
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) return <Loading />;
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
