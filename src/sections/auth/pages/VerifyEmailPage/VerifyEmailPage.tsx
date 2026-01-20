import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "sections/shared/components/Loader/Loader";
import NomadeLogoSection from "sections/shared/components/NomadeLogoSection/NomadeLogoSection";
import VerifyEmailPageStyled from "./VerifyEmailPageStyled";

const VerifyEmailPage = (): React.ReactElement => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const redirectUrl = searchParams.get("redirect");

    if (redirectUrl) {
      // Decode and redirect to backend URL
      const decodedUrl = decodeURIComponent(redirectUrl);
      window.location.href = decodedUrl;
    }
  }, [searchParams]);

  return (
    <VerifyEmailPageStyled className="verify-email-page">
      <div className="verify-email-page__content">
        <NomadeLogoSection />
        <div className="verify-email-page__loading">
          <Loader width="40px" height="40px" />
          <p>Verificando email...</p>
        </div>
      </div>
    </VerifyEmailPageStyled>
  );
};

export default VerifyEmailPage;
