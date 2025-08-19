import { Navigate, useLocation } from "react-router-dom";
import { appPaths } from "../../utils/appPaths/appPaths";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import Loader from "../Loader/Loader";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps): JSX.Element => {
  const { getSessionToken, user, isLoading } = useAuthContext();
  const location = useLocation();

  const isAuthenticated = !!getSessionToken();

  const isUserLoaded = isAuthenticated ? !!user?.type : true;

  if (!isUserLoaded || isLoading) {
    return <Loader width="20px" height="20px" />;
  }

  if (isAuthenticated) {
    if (
      location.pathname === appPaths.login ||
      location.pathname === appPaths.register ||
      location.pathname === "/" ||
      location.pathname === appPaths.recovery_password ||
      location.pathname === appPaths.new_password ||
      location.pathname === appPaths.reset_password ||
      location.pathname === appPaths.leadsSubmit
    ) {
      return (
        <Navigate
          to={user?.type === "Company" ? "/collabs/page/1" : "/usuarios/page/1"}
          replace={true}
        />
      );
    }
  } else {
    if (
      location.pathname !== appPaths.login &&
      location.pathname !== appPaths.register &&
      location.pathname !== appPaths.termsConditionsOffline &&
      location.pathname !== appPaths.recovery_password &&
      location.pathname !== appPaths.new_password &&
      location.pathname !== appPaths.reset_password &&
      location.pathname !== appPaths.leadsSubmit &&
      location.pathname !== appPaths.logout
    ) {
      return <Navigate to={appPaths.login} replace={true} />;
    }
  }

  return element;
};

export default ProtectedRoute;
