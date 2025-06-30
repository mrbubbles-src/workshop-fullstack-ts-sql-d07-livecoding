import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey='"vite-ui-theme'>
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
