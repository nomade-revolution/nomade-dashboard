import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useEffect } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import Loader from "sections/shared/components/Loader/Loader";
import { useUserContext } from "sections/user/UserContext/useUserContext";

const TermConditionsPage = () => {
  const { conditions, loading, getConditions } = useUserContext();
  const { selectedCompany } = useAuthContext();

  useEffect(() => {
    if (!conditions && selectedCompany) {
      getConditions(selectedCompany);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return (
    <ReusablePageStyled className="plans-page">
      <>
        {loading ? (
          <Loader width="20px" height="20px" />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: conditions }} />
        )}
      </>
    </ReusablePageStyled>
  );
};

export default TermConditionsPage;
