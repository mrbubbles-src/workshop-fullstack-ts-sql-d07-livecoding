import { useMemodex } from '@/hooks/use-memodex';
import { useTimer } from 'react-timer-hook';
const Timer = () => {
  const { operator, handleLogout } = useMemodex();

  const storedStartTime = localStorage.getItem('sessionStartTime');

  const startTime = storedStartTime ? parseInt(storedStartTime) : Date.now();

  if (!storedStartTime) {
    localStorage.setItem('sessionStartTime', startTime.toString());
  }

  const expiryTimestamp = new Date(startTime + 4 * 60 * 60 * 1000);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      localStorage.removeItem('sessionStartTime');
      handleLogout();
    },
  });

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="flex flex-col items-center justify-center">
      <p className="text-primary mb-2 text-center text-xl font-semibold">
        {operator?.operator_name &&
          `Willkommen zurück, ${operator.operator_name}, Ihre heutige Session endet in:`}
      </p>
      <p className="text-secondary text-2xl font-semibold">
        {`${format(hours)}:${format(minutes)}:${format(seconds)}`}
      </p>
    </section>
  );
};

export default Timer;
