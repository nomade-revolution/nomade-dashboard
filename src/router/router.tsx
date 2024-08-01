import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../sections/shared/components/ProtectedRoute/ProtectedRoute";
import NotFound from "../sections/shared/pages/NotFound/NotFound";
import { appPaths } from "../sections/shared/utils/appPaths/appPaths";
import LoginPage from "../sections/auth/pages/LoginPage/LoginPage";
import UsersPage from "../sections/user/pages/UsersPage/UsersPage";
import OffersPage from "../sections/offers/pages/OffersPage/OffersPage";
import MyAccountPage from "../sections/user/pages/MyAccountPage/MyAccountPage";
import CollabsPage from "sections/collabs/pages/CollabsPage";
import InfluencersPage from "sections/influencer/pages/InfluencerPage";
import CompaniesPage from "sections/company/pages/CompanyPage";

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
      {
        path: appPaths.influencers,
        element: <InfluencersPage />,
      },
      {
        path: appPaths.clients,
        element: <CompaniesPage />,
      },

      {
        path: appPaths.offers,
        element: <OffersPage />,
      },
      {
        path: appPaths.collabs,
        element: <CollabsPage />,
      },
      {
        path: appPaths.account,
        element: <MyAccountPage />,
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
