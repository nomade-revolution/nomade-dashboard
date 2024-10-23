import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../sections/shared/components/ProtectedRoute/ProtectedRoute";
import NotFound from "../sections/shared/pages/NotFound/NotFound";
import { appPaths } from "../sections/shared/utils/appPaths/appPaths";
import LoginPage from "../sections/auth/pages/LoginPage/LoginPage";
import UsersPage from "../sections/user/pages/UsersPage/UsersPage";
import OffersPage from "../sections/offers/pages/OffersPage/OffersPage";
import MyAccountPage from "../sections/user/pages/MyAccountPage/MyAccountPage";
import InfluencerDetailPage from "sections/influencer/pages/InfluencerDetailPage/InfluencerDetailPage";
import InfluencersPage from "sections/influencer/pages/InfluencerPage/InfluencerPage";
import CompaniesPage from "sections/company/pages/CompanyPage/CompanyPage";
import CompanyDetailPage from "sections/company/pages/CompanyDetailPage/CompanyDetailPage";
import LeadsPage from "sections/leads/pages/LeadsPage/LeadsPage";
import LeadsSubmitInfoPage from "sections/leads/pages/LeadsSubmitInfoPage/LeadsSubmitInfoPage";
import CollabsPage from "sections/collabs/pages/CollabsPage/CollabsPage";
import CollabDetailPage from "sections/collabs/pages/CollabDetailPage/CollabDetailPage";
import RecoverPasswordPage from "sections/auth/pages/RecoverPasswordPage/RecoverPasswordPage";
import CategoriesPage from "sections/categories/pages/CategoriesPage";
import CollabsReservationsPage from "sections/collabs/pages/CollabsReservations/CollabsReservationsPage";
import OfferDetailsPage from "sections/offers/pages/OfferDetailPage/OfferDetailPage";
import PlansPage from "sections/plans/pages/PlansPage/PlansPage";

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
        path: appPaths.recovery_password,
        element: <RecoverPasswordPage />,
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
        path: appPaths.influencer,
        element: <InfluencerDetailPage />,
      },
      {
        path: appPaths.clients,
        element: <CompaniesPage />,
      },
      {
        path: appPaths.client,
        element: <CompanyDetailPage />,
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
        path: appPaths.collab,
        element: <CollabDetailPage />,
      },
      {
        path: appPaths.leads,
        element: <LeadsPage />,
      },
      {
        path: appPaths.leadsSubmit,
        element: <LeadsSubmitInfoPage />,
      },
      {
        path: appPaths.account,
        element: <MyAccountPage />,
      },
      {
        path: appPaths.categories,
        element: <CategoriesPage />,
      },
      {
        path: appPaths.collabsReservations,
        element: <CollabsReservationsPage />,
      },
      {
        path: appPaths.offerDetail,
        element: <OfferDetailsPage />,
      },
      {
        path: appPaths.plans,
        element: <PlansPage />,
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
