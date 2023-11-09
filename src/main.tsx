import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContext, defaultAuth } from './context/auth-context.ts';
import { PageName, Paths } from './helpers/paths.ts';
import './index.css';
import { EditorPage } from './pages/EditorPage.tsx';
import { ErrorPage } from './pages/ErrorPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { SettingsPage } from './pages/SettingsPage.tsx';
import React from 'react';
import { Config } from './config/config.ts';

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
]);

const app = Config.devMode ? (
  <React.StrictMode>
    <AuthContext.Provider value={defaultAuth}>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext.Provider>
  </React.StrictMode>
) : (
  <AuthContext.Provider value={defaultAuth}>
    <RouterProvider router={router}></RouterProvider>
  </AuthContext.Provider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(app);
