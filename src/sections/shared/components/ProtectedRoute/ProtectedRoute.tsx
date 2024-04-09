import { Navigate, useLocation } from "react-router-dom";
import { appPaths } from "../../utils/appPaths/appPaths";
import { useUserContext } from "../../../user/UserContext/useUserContext";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps): JSX.Element => {
  const { getUserLogged } = useUserContext();

  const user = getUserLogged();

  const location = useLocation();

  if (user) {
    if (
      location.pathname === appPaths.login ||
      location.pathname === appPaths.register ||
      location.pathname === "/" ||
      location.pathname === appPaths.recovery_password ||
      location.pathname === appPaths.reset_password
    ) {
      return <Navigate to={"/usuarios"} replace={true} />;
    }
  } else {
    if (
      location.pathname !== appPaths.login &&
      location.pathname !== appPaths.register &&
      location.pathname !== appPaths.recovery_password &&
      location.pathname !== appPaths.reset_password
    ) {
      return <Navigate to={appPaths.login} replace={true} />;
    }
  }

  return element;
};

export default ProtectedRoute;
