import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Config } from './config/config.ts';
import { AuthProvider } from './context/auth-context.tsx';
import { PageName, Paths } from './helpers/paths.ts';
import './main.css';
import { EditorPage } from './pages/EditorPage.tsx';
import { ErrorPage } from './pages/ErrorPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';
import { Layout } from './pages/Layout.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Paths[PageName.Home],
        element: <HomePage />,
      },
      {
        path: Paths[PageName.Login],
        element: <LoginPage />,
      },
      {
        path: Paths[PageName.Register],
        element: <RegisterPage />,
      },
      {
        path: Paths[PageName.Editor],
        element: <EditorPage />,
      },
      {
        path: Paths[PageName.Settings],
        element: <SettingsPage />,
      },
      {
        path: Paths[PageName.Profile](),
        element: <ProfilePage />,
      },
    ],
  },
]);

const root = (
  <>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </>
);

const app = Config.devMode ? <React.StrictMode>{root}</React.StrictMode> : root;

ReactDOM.createRoot(document.getElementById('root')!).render(app);
