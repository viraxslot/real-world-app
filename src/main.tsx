import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PageName, Paths } from './helpers/paths.ts';
import './index.css';
import ErrorPage from './pages/ErrorPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import { store } from './store/store.ts';

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
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
);
