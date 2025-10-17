import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//https://reactrouter.com/start/data/installation
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './pages/Home.jsx';
import Listado from './pages/Listado.jsx';
import Detalle from './pages/Detalle.jsx';
import Layout from './components/Layout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listado",
        element: <Listado />,
      },
      {
        path: "/detalle/:id",
        element: <Detalle />,
      },
    ],
  },
  {
    path: '/admin',
    element: <div>ADMIN</div>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
