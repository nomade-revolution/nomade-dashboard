import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import LayoutStyled from "./LayoutStyled";

import { appPaths } from "../../utils/appPaths/appPaths";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { useMediaQuery } from "@mui/material";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";

const Layout = (): React.ReactElement => {
  const location = useLocation();
  const matches = useMediaQuery("(max-width: 1200px)");
  const [isMinimized, setIsMinimized] = useState<boolean>(matches);

  const {
    setSessionToken,
    token,
    getLoggedUser,
    user,
    setSelectedCompany,
    logoutUser,
    selectedCompany,
  } = useAuthContext();

  const { getAllOffers, offers } = useOffersContext();
  const { getInfluencersStatusBadge, badgeCount: badgeCountInfluencers } =
    useInfluencerContext();
  const { getCompaniesStatusBadge, badgeCount: badgeCountCompanies } =
    useCompanyContext();

  const { getLeadsStatusBadge, badgeCount: badgeCountLeads } =
    useLeadsContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCompany) return;
    if (user && user.companies && user.companies.length > 0) {
      setSelectedCompany(user.companies[0].id);
    }
  }, [user, setSelectedCompany]);

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
      if (!selectedCompany) return;
      const companyId = selectedCompany;
      const filters = {
        filters: { company_id: companyId },
      };
      getAllOffers(1, 1, filters);
    }
  }, [getAllOffers, user, selectedCompany]);

  useEffect(() => {
    getInfluencersStatusBadge();
  }, [getInfluencersStatusBadge]);

  useEffect(() => {
    getCompaniesStatusBadge();
  }, [getCompaniesStatusBadge]);

  useEffect(() => {
    getLeadsStatusBadge();
  }, [getLeadsStatusBadge]);

  useEffect(() => {
    if (!user) {
      logoutUser(), navigate(0);
    }
  }, [logoutUser, navigate, user]);

  useEffect(() => {
    setIsMinimized(matches);
  }, [matches]);

  return (
    <LayoutStyled $isMinimized={isMinimized}>
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
                badgeLeads={badgeCountLeads}
                user={user}
                offer={offers[0]}
                isMinimized={isMinimized}
                setIsMinimized={setIsMinimized}
              />
            )}
        </section>
        <div className="layout__header">
          <Header
            badgeCountUsers={0}
            badgeCountInfluencers={badgeCountInfluencers}
            badgeCountCompanies={badgeCountCompanies}
            badgeCountsLeads={badgeCountLeads}
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
