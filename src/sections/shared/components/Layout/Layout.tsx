import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import LayoutStyled from "./LayoutStyled";

import { appPaths } from "../../utils/appPaths/appPaths";
import Header from "../Header/Header";
import { useEffect } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { Company } from "modules/user/domain/User";

const Layout = (): React.ReactElement => {
  const location = useLocation();
  const { setSessionToken, token } = useAuthContext();

  const { getLoggedUser, user } = useAuthContext();
  const { getAllOffers, offers } = useOffersContext();

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
                pendingOrders={5}
                pendingCustomers={10}
                user={user}
                offer={offers[0]}
              />
            )}
        </section>
        <div className="layout__header">
          <Header pendingOrders={5} pendingCustomers={10} />
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
