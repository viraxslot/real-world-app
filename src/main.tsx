import React from 'react';
import ReactDOM from 'react-dom/client';
import { HomePage } from './pages/HomePage.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { PageName, Paths } from './helpers/paths.ts';
import RegisterPage from './pages/RegisterPage.tsx';

const router = createBrowserRouter([
  {
    path: Paths[PageName.Home],
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: Paths[PageName.Login],
    element: <LoginPage />,
  },
  {
    path: Paths[PageName.Register],
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
