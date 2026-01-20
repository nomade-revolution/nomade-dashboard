import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "sections/shared/components/Loader/Loader";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
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
        <div className="verify-email-page__logo">
          <ImageCustom
            alt="Nomade logo"
            className="verify-email-page__logo-image"
            image="/main_logo.png"
            width={450}
            height={166}
          />
        </div>
        <div className="verify-email-page__loading">
          <Loader width="40px" height="40px" />
          <p>Verificando email...</p>
        </div>
      </div>
    </VerifyEmailPageStyled>
  );
};

export default VerifyEmailPage;
