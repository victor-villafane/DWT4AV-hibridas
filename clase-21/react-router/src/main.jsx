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
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin.jsx';
import { SessionContext, SessionProvider } from './contexts/SessionContext.jsx';

// export async function loaderProductos() {
//   const res = await fetch("http://localhost:2025/api/productos")
//   const productos = await res.json()
//   return { productos }
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listado",
        element: <ProtectedRoute element={<Listado />} />,
        //loader: loaderProductos,
        //errorElement: <div>Error</div>
      },
      {
        path: "/detalle/:id",
        element: <ProtectedRoute element={<Detalle />} />,
        //loader: loaderDetalle
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/logout",
        element: <Logout />
      }      
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRouteAdmin element={<div>ADMIN</div>} />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)
