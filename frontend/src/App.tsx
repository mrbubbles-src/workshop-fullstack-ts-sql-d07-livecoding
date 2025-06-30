// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout';

// Pages
import Home from './pages/home';

// Styling
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/600-italic.css';
import '@fontsource/poppins/700-italic.css';
import '@fontsource-variable/fira-code/index.css';
import '@fontsource-variable/lora/index.css';
import '@/App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
