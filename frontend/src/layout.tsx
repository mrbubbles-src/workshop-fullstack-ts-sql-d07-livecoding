import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/context/theme-provider';
import Navbar from '@/components/layout/navbar/navbar';
import { Toaster } from './components/ui/shadcn/sonner';
import { MemodexProvider } from './context/memodex-provider';

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <MemodexProvider>
          <Navbar />
          <main className="container mx-auto mt-20 flex flex-col items-center antialiased lg:mt-0 lg:min-h-screen lg:justify-center">
            <Outlet />
          </main>
          <Toaster richColors position="top-center" />
        </MemodexProvider>
      </ThemeProvider>
    </>
  );
};

export default Layout;
