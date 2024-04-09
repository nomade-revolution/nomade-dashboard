import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../sections/shared/components/ProtectedRoute/ProtectedRoute";
import NotFound from "../sections/shared/pages/NotFound/NotFound";
import { appPaths } from "../sections/shared/utils/appPaths/appPaths";
import LoginPage from "../sections/user/pages/LoginPage/LoginPage";
import UsersPage from "../sections/user/pages/UsersPage/UsersPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />,
    errorElement: <NotFound />,
    children: [
      {
        path: appPaths.login,
        element: <LoginPage />,
      },
      {
        path: appPaths.users,
        element: <UsersPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export const getComponentRouter = (ui: React.ReactElement) =>
  createBrowserRouter([
    {
      path: "/",
      element: ui,
    },
  ]);
