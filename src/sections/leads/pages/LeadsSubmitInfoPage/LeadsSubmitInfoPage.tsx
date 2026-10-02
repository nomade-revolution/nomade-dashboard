import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LeadsForm from "sections/leads/components/LeadsForm/LeadsForm";
import LeadLinkMessage from "sections/leads/components/LeadLinkMessage/LeadLinkMessage";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import { readRegistrationHash } from "sections/leads/utils/readRegistrationHash";
import { registrationLinkCopy } from "sections/leads/utils/registrationLinkCopy";
import LeadsSubmitInfoPageStyled from "./LeadsSubmitInfoPageStyled";
import NomadeLogoSection from "sections/shared/components/NomadeLogoSection/NomadeLogoSection";
import Loader from "sections/shared/components/Loader/Loader";

const LeadsSubmitInfoPage = (): React.ReactElement => {
  const { search } = useLocation();
  const { getLeadFromHash, lead, linkStatus, setLinkStatus } =
    useLeadsContext();
  const hash = readRegistrationHash(search);

  useEffect(() => {
    if (!hash) {
      setLinkStatus("invalid");
      return;
    }

    void getLeadFromHash(hash);
  }, [getLeadFromHash, hash, setLinkStatus]);

  const renderContent = () => {
    if (linkStatus === "loading") {
      return <Loader width="40px" height="40px" />;
    }

    if (linkStatus === "valid" && hash) {
      return <LeadsForm lead={lead} hash={hash} />;
    }

    if (linkStatus === "expired") {
      return <LeadLinkMessage text={registrationLinkCopy.expired} />;
    }

    if (linkStatus === "error" && hash) {
      return (
        <LeadLinkMessage
          text={registrationLinkCopy.loadError}
          onRetry={() => {
            void getLeadFromHash(hash);
          }}
        />
      );
    }

    return <LeadLinkMessage text={registrationLinkCopy.invalid} />;
  };

  return (
    <LeadsSubmitInfoPageStyled className="leadSubmit-page">
      <div className="leadSubmit-page__company">
        <NomadeLogoSection />
      </div>
      <div className="leadSubmit-page__form-section">{renderContent()}</div>
    </LeadsSubmitInfoPageStyled>
  );
};

export default LeadsSubmitInfoPage;
