import { Navigate, useLocation } from "react-router-dom";
import { appPaths } from "../../utils/appPaths/appPaths";
import { useEffect, useState } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps): JSX.Element => {
  const [token, setToken] = useState<string>("");

  const { getSessionToken } = useAuthContext();

  useEffect(() => {
    (async () => {
      const token = await getSessionToken();
      setToken(token!);
    })();
  }, [getSessionToken]);

  const location = useLocation();

  if (token) {
    if (
      location.pathname === appPaths.login ||
      location.pathname === appPaths.register ||
      location.pathname === "/" ||
      location.pathname === appPaths.recovery_password ||
      location.pathname === appPaths.reset_password
    ) {
      return <Navigate to={appPaths.users} replace={true} />;
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
