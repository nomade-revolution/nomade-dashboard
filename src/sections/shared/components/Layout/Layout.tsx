import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import LayoutStyled from "./LayoutStyled";

import { appPaths } from "../../utils/appPaths/appPaths";
import Header from "../Header/Header";
import { useEffect } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { Company } from "modules/user/domain/User";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";

const Layout = (): React.ReactElement => {
  const location = useLocation();

  const { setSessionToken, token, getLoggedUser, user, logoutUser } =
    useAuthContext();

  const { getAllOffers, offers } = useOffersContext();
  const { getInfluencersStatusBadge, badgeCount: badgeCountInfluencers } =
    useInfluencerContext();
  const { getCompaniesStatusBadge, badgeCount: badgeCountCompanies } =
    useCompanyContext();

  const navigate = useNavigate();

  useEffect(() => {
    setSessionToken();
  }, [setSessionToken]);

  useEffect(() => {
    async function fetchUser() {
      await getLoggedUser(token);
    }

    fetchUser();
  }, [getLoggedUser, token]);

  useEffect(() => {
    if (user.type === "Company") {
      const filters = {
        filters: { company_id: (user as Company).id },
      };
      getAllOffers(1, 1, filters);
    }
  }, [getAllOffers, user]);

  useEffect(() => {
    getInfluencersStatusBadge();
  }, [getInfluencersStatusBadge]);

  useEffect(() => {
    getCompaniesStatusBadge();
  }, [getCompaniesStatusBadge]);

  useEffect(() => {
    if (!user) {
      logoutUser(), navigate(0);
    }
  }, [logoutUser, navigate, user]);

  return (
    <LayoutStyled>
      <div
        className={
          location.pathname !== appPaths.login &&
          location.pathname !== appPaths.register &&
          location.pathname !== appPaths.recovery_password &&
          location.pathname !== appPaths.reset_password &&
          location.pathname !== appPaths.leadsSubmit
            ? "layout"
            : ""
        }
      >
        <section
          className={
            location.pathname === appPaths.login ||
            location.pathname === appPaths.register ||
            location.pathname === appPaths.recovery_password ||
            location.pathname === appPaths.reset_password ||
            location.pathname === appPaths.leadsSubmit
              ? "layout__sidebar-hidden"
              : "layout__sidebar"
          }
        >
          {location.pathname !== appPaths.login &&
            location.pathname !== appPaths.register &&
            location.pathname !== appPaths.recovery_password &&
            location.pathname !== appPaths.reset_password &&
            location.pathname !== appPaths.leadsSubmit && (
              <SideBar
                badgeUsers={0}
                badgeInfluencers={badgeCountInfluencers}
                badgeCompanies={badgeCountCompanies}
                user={user}
                offer={offers[0]}
              />
            )}
        </section>
        <div className="layout__header">
          <Header
            badgeCountUsers={0}
            badgeCountInfluencers={badgeCountInfluencers}
            badgeCountCompanies={badgeCountCompanies}
            offer={offers[0]}
            user={user}
          />
        </div>

        <main
          className={
            location.pathname == appPaths.login ||
            location.pathname === appPaths.register ||
            location.pathname === appPaths.recovery_password ||
            location.pathname === appPaths.reset_password ||
            location.pathname === appPaths.leadsSubmit
              ? "layout__sidebar-hidden"
              : "layout__pages"
          }
        >
          <Outlet />
        </main>
      </div>
    </LayoutStyled>
  );
};

export default Layout;
