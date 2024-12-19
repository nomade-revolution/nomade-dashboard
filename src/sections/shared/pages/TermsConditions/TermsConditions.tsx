import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useEffect } from "react";
import Loader from "sections/shared/components/Loader/Loader";
import { useUserContext } from "sections/user/UserContext/useUserContext";

const TermConditionsPage = () => {
  const { conditions, loading, getConditions } = useUserContext();

  useEffect(() => {
    if (!conditions) {
      getConditions();
    }
  }, [getConditions, conditions]);

  return (
    <ReusablePageStyled className="plans-page">
      <>
        {loading ? <Loader width="20px" height="20px" /> : <p>{conditions}</p>}
      </>
    </ReusablePageStyled>
  );
};

export default TermConditionsPage;
