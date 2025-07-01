import { Button } from '@/components/ui/shadcn/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/shadcn/form';
import { Input } from '@/components/ui/shadcn/input';
import { useMemodex } from '@/hooks/use-memodex';
import { useEffect } from 'react';
import { Form, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

interface Inputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { setIsLoggedIn } = useMemodex();

  const form = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_HQ}/operator/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error(
          'Login fehlgeschlagen. Bitte überprüfen Sie ihre Anmdeldeinformationen.',
        );
        throw new Error('Login Failed');
      }

      toast.success('Login erfolgreich! Weiterleitung...');

      setTimeout(() => {
        setIsLoggedIn(true);
      }, 1500);
    } catch (error) {
      toast.error(
        'Login fehlgeschlagen. Überprüfen Sie die Konsole auf Details.',
      );
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    reset({
      email: '',
      password: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 p-10 md:max-w-2xl">
        <FormField
          control={control}
          name="email"
          render={(field) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={(field) => (
            <FormItem>
              <FormLabel className="text-lg">Passwort</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Passwort" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[3rem] w-[9rem] items-center justify-center place-self-start text-lg font-semibold">
          {isSubmitting ? 'Wird Eingelogged...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
