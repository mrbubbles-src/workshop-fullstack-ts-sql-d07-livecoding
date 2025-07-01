import Logout from '@/components/layout/logout/logout';
import Memory from '@/components/layout/memory/memory';
import Timer from '@/components/layout/timer/timer';
import { useMemodex } from '@/hooks/use-memodex';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isLoggedIn, isLoading } = useMemodex();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  return (
    <>
      <section className="p-4">
        <Timer />
        <hr className="border-accent/50 my-4" />
      </section>
      <section className="p-4">
        <Memory />
      </section>
      <section className="p-4">
        <Logout />
      </section>
    </>
  );
};

export default Home;
