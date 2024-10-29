import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

const LogoutPage = () => {
  const { logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  const handleLogout = useCallback(() => {
    if (!hasLoggedOut) {
      logoutUser();
      setHasLoggedOut(true);
      navigate("/login");
    }
  }, [logoutUser, navigate, hasLoggedOut]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);
  return <></>;
};

export default LogoutPage;
