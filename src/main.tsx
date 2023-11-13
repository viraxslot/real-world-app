import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { HomePage } from './pages/HomePage.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { PageName, Paths } from './helpers/paths.ts';
import SignUpPage from './pages/SignUpPage.tsx';

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
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
