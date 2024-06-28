import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import LayoutStyled from "./LayoutStyled";

import { appPaths } from "../../utils/appPaths/appPaths";
import Header from "../Header/Header";

const Layout = (): React.ReactElement => {
  const location = useLocation();
  // const { decodedToken, token } = useUserContext();

  // useEffect(() => {
  //   token();
  // }, [token]);

  return (
    <LayoutStyled>
      <div
        className={
          location.pathname !== appPaths.login &&
          location.pathname !== appPaths.register &&
          location.pathname !== appPaths.recovery_password &&
          location.pathname !== appPaths.reset_password
            ? "layout"
            : ""
        }
      >
        <section
          className={
            location.pathname === appPaths.login ||
            location.pathname === appPaths.register ||
            location.pathname === appPaths.recovery_password ||
            location.pathname === appPaths.reset_password
              ? "layout__sidebar-hidden"
              : "layout__sidebar"
          }
        >
          {location.pathname !== appPaths.login &&
            location.pathname !== appPaths.register &&
            location.pathname !== appPaths.recovery_password &&
            location.pathname !== appPaths.reset_password && (
              <SideBar pendingOrders={5} pendingCustomers={10} />
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
            location.pathname === appPaths.reset_password
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
