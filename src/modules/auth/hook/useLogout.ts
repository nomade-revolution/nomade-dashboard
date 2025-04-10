import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import { useUserContext } from "sections/user/UserContext/useUserContext";

const useLogout = () => {
  const { logoutUser } = useAuthContext();
  const { setBadgeCount: setCollabsBadge } = useCollabsContext();
  const { setBadgeCount: setCompaniesBadge } = useCompanyContext();
  const { setBadgeCount: setInfluencersBadge } = useInfluencerContext();
  const { setBadgeCount: setLeadsBadge } = useLeadsContext();
  const { setBadgeCount: setUsersBadge } = useUserContext();

  const handleLogout = () => {
    logoutUser();
    setCollabsBadge(0);
    setCompaniesBadge(0);
    setInfluencersBadge(0);
    setLeadsBadge(0);
    setUsersBadge(0);
  };

  return {
    handleLogout,
  };
};

export default useLogout;
