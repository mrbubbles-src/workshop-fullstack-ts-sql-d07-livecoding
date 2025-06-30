import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';
import { Toaster } from './components/ui/shadcn/sonner';

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey='"vite-ui-theme'>
        <main>
          <Outlet />
        </main>
        <Toaster richColors position="top-center" />
      </ThemeProvider>
    </>
  );
};

export default Layout;
