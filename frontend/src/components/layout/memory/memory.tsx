import { Button } from '@/components/ui/shadcn/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/shadcn/card';
import { Badge } from '@/components/ui/shadcn/badge';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useMemodex } from '@/hooks/use-memodex';
import Loading from '@/components/ui/loading';

interface MemoryData {
  id: string;
  memory: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const Memory = () => {
  const { operator, isLoading, setIsLoading } = useMemodex();
  const [memory, setMemory] = useState<MemoryData | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const hasFetched = useRef(false);

  const fetchMemory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_HQ}/memories/`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        toast.error('Erinnerung konnte nicht abgerufen werden.');
        return;
      }
      const data = await res.json();
      setMemory(data.memory);
    } catch (error) {
      toast.error('Fehler beim Abrufen der Erinnerung');
      console.error('Error fetching memory data:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const checkMemoryStatus = async () => {
    if (isChecking) {
      toast.error('Bitte warten Sie, während die Erinnerung überprüft wird.');
      return;
    }

    setIsChecking(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_HQ}/memories/check-status`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ memoryId: memory?.id }),
        },
      );
      if (!res.ok) {
        toast.error(
          'Verifikation fehlgeschlagen. Bitte versuchen Sie es später erneut.',
        );
        return;
      }

      await fetchMemory();
    } catch (error) {
      toast.error(
        'Verifikation fehlgeschlagen. Bitte versuchen Sie es später erneut.',
      );
      console.error('Error checking memory status:', error);
    } finally {
      setIsChecking(false);
      toast.success(
        `Interessant. Bitte fahren Sie fort mit der Klassifizierung, ${operator?.operator_name}.`,
      );
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchMemory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      {memory && (
        <Card className="my-4 max-w-lg">
          <CardHeader>
            <p className="text-primary font-mono text-lg font-bold text-pretty">
              Memory_{memory.id}
            </p>
            <Badge variant={'secondary'} className="font-mono font-semibold">
              {memory.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{memory.memory}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap justify-center gap-4">
            <Button
              variant={'ghost'}
              className="text-base font-semibold"
              onClick={checkMemoryStatus}>
              Nonsens
            </Button>
            <Button
              variant={'ghost'}
              className="text-base font-semibold"
              onClick={checkMemoryStatus}>
              Real
            </Button>
            <Button
              variant={'ghost'}
              className="text-base font-semibold"
              onClick={checkMemoryStatus}>
              Eingepflanzt
            </Button>
            <Button
              variant={'ghost'}
              className="text-base font-semibold"
              onClick={checkMemoryStatus}>
              Déjà-vu
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Memory;
