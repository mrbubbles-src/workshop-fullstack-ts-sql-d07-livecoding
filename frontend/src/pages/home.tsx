import Memory from '@/components/layout/memory/memory';
import Timer from '@/components/layout/timer/timer';
import { useMemodex } from '@/hooks/use-memodex';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  // const { isLoggedIn, isLoading } = useMemodex();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoading && !isLoggedIn) {
  //     navigate('/login');
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading, isLoggedIn]);

  return (
    <>
      <section className="p-2">
        <Timer />
      </section>
      <section className="p-2">
        <Memory />
      </section>
    </>
  );
};

export default Home;
