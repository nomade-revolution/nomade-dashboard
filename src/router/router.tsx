import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../sections/shared/components/ProtectedRoute/ProtectedRoute";
import NotFound from "../sections/shared/pages/NotFound/NotFound";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />,
    errorElement: <NotFound />,
    children: [
      // {
      //   path: appPaths.orders,
      //   element: <OrdersPage />,
      // },
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
