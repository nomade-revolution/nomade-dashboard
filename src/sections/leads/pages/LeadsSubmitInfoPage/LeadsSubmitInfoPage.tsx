import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LeadsForm from "sections/leads/components/LeadsForm/LeadsForm";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import LeadsSubmitInfoPageStyled from "./LeadsSubmitInfoPageStyled";
import NomadeLogoSection from "sections/shared/components/NomadeLogoSection/NomadeLogoSection";
import Loader from "sections/shared/components/Loader/Loader";

const LeadsSubmitInfoPage = (): React.ReactElement => {
  const { search } = useLocation();
  const { getLeadFromHash, lead, loading } = useLeadsContext();

  const hash = search.split("=")[1];

  useEffect(() => {
    getLeadFromHash(hash);
  }, [getLeadFromHash, hash]);

  return (
    <LeadsSubmitInfoPageStyled className="leadSubmit-page">
      <div className="leadSubmit-page__company">
        <NomadeLogoSection />
      </div>
      <div className="leadSubmit-page__form-section">
        {loading ? (
          <Loader width="40px" height="40px" />
        ) : (
          <LeadsForm lead={lead} hash={hash} />
        )}
      </div>
    </LeadsSubmitInfoPageStyled>
  );
};

export default LeadsSubmitInfoPage;
