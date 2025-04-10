import useLogout from "@auth/hook/useLogout";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const { handleLogout: logoutUser } = useLogout();
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
