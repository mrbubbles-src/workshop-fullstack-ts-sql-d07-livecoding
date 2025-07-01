import LoginForm from '@/components/layout/login/login-form';
import Loading from '@/components/ui/loading';
import { useMemodex } from '@/hooks/use-memodex';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { isLoggedIn, isLoading } = useMemodex();
  const navigate = useNavigate();

  console.log('isLoggedIn', isLoggedIn);
  console.log('isLoading', isLoading);
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isLoggedIn]);

  if (isLoading) return <Loading />;

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
