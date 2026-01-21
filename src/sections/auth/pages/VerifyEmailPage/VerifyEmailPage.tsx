import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "sections/shared/components/Loader/Loader";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import customAxios from "sections/shared/utils/customAxios/customAxios";
import environments from "sections/shared/utils/environments/environments";
import VerifyEmailPageStyled from "./VerifyEmailPageStyled";

type VerificationStatus = "loading" | "success" | "error";

const VerifyEmailPage = (): React.ReactElement => {
  console.log("VERIFY EMAIL PAGE MOUNTED");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>("loading");

  useEffect(() => {
    const verify = async () => {
      console.log("VERIFY EMAIL EFFECT TRIGGERED");
      // Read parameters from URL
      const user = searchParams.get("user");
      const hash = searchParams.get("hash");
      const expires = searchParams.get("expires");
      const signature = searchParams.get("signature");

      // Validate all required parameters are present
      if (!user || !hash || !expires || !signature) {
        setStatus("error");
        return;
      }

      try {
        setStatus("loading");

        // Prepare payload
        const payload = {
          user: parseInt(user, 10),
          hash,
          expires: parseInt(expires, 10),
          signature,
        };

        // Call backend API
        // Construct URL: baseUrl already includes /api, so append /email/verify
        const baseUrl = environments.baseUrl?.endsWith("/")
          ? environments.baseUrl.slice(0, -1)
          : environments.baseUrl;
        const apiUrl = `${baseUrl}/email/verify`;
        const response = await customAxios("POST", apiUrl, {
          data: payload,
        });

        if (response.success) {
          navigate("/email-verified");
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    verify();
  }, [searchParams, navigate]);

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
        {status === "loading" && (
          <div className="verify-email-page__loading">
            <Loader width="40px" height="40px" />
            <p>Verificando email...</p>
          </div>
        )}
        {status === "error" && (
          <div className="verify-email-page__error">
            <p>El enlace de verificación no es válido o ha expirado.</p>
          </div>
        )}
      </div>
    </VerifyEmailPageStyled>
  );
};

export default VerifyEmailPage;
