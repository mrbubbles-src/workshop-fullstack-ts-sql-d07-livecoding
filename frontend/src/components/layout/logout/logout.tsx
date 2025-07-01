import { Button } from '@/components/ui/shadcn/button';
import { useMemodex } from '@/hooks/use-memodex';

const Logout = () => {
  const { handleLogout } = useMemodex();
  return (
    <Button
      className="hover:bg-secondary text-base font-semibold"
      onClick={handleLogout}>
      Session vorzeitig beenden
    </Button>
  );
};

export default Logout;
