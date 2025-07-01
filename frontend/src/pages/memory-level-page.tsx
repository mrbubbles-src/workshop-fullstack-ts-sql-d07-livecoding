import Loading from '@/components/ui/loading';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/shadcn/card';
import { useMemodex } from '@/hooks/use-memodex';
import { Badge } from '@/components/ui/shadcn/badge';
import { useEffect } from 'react';

const MemoryLevelPage = () => {
  const { operator, setOperator, isLoading, setIsLoading } = useMemodex();

  useEffect(() => {
    const fetchOperatorData = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`${import.meta.env.VITE_HQ}/operator/data`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) {
          console.error('Failed to fetch operator data');
        }
        const data = await res.json();
        setOperator({
          operator_name: data.operator_name,
          role: data.role,
          memory_level: data.memory_level,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching operator data:', error);
        setIsLoading(false);
      }
    };

    fetchOperatorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;

  return (
    <section className="container flex flex-col items-center gap-4 p-4">
      <Card className="my-4 max-w-lg">
        <CardHeader>
          <p className="text-primary font-mono text-3xl font-bold text-pretty">
            Gratulation, {operator?.operator_name}!
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            Nach dieser Session beträgt Ihr Gedächtnis-Level:{' '}
            <Badge
              variant={'secondary'}
              className="font-mono text-xl font-semibold">
              {operator?.memory_level}
            </Badge>
          </p>
        </CardContent>
        <CardFooter className="flex justify-center text-lg font-bold text-pretty">
          <p>Bis zur nächsten Session, {operator?.operator_name}.</p>
        </CardFooter>
      </Card>
      <p className="bg-accent animate-pulse rounded-lg p-5 text-center font-mono text-2xl font-bold text-pretty shadow">
        Ihre Session wird in wenigen Sekunden automatisch beendet.
      </p>
    </section>
  );
};

export default MemoryLevelPage;
