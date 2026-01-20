import { useNavigate } from "react-router-dom";
import NomadeLogoSection from "sections/shared/components/NomadeLogoSection/NomadeLogoSection";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import EmailVerifiedPageStyled from "./EmailVerifiedPageStyled";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import theme from "assets/styles/theme";
import { FaArrowRight } from "react-icons/fa";

const EmailVerifiedPage = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <EmailVerifiedPageStyled className="email-verified-page">
      <div className="email-verified-page__content">
        <NomadeLogoSection />
        <div className="email-verified-page__message">
          <div className="email-verified-page__icon">✅</div>
          <h1>Email verificado</h1>
          <p>Tu email ha sido verificado correctamente.</p>
          <p>Ya puedes iniciar sesión en tu cuenta.</p>
        </div>
        <div className="email-verified-page__actions">
          <ActionButton
            icon={<FaArrowRight />}
            text="Ir al inicio de sesión"
            onClick={() => navigate(appPaths.login)}
            color={theme.colors.darkBlue}
          />
        </div>
      </div>
    </EmailVerifiedPageStyled>
  );
};

export default EmailVerifiedPage;
