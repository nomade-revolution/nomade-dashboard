import RecoverPasswordForm from "sections/auth/components/RecoverPasswordForm/RecoverPasswordForm";
import RecoverPageStyled from "./RecoverPasswordPageStyled";
import NomadeLogoSection from "sections/shared/components/NomadeLogoSection/NomadeLogoSection";

const RecoverPasswordPage = () => {
  return (
    <RecoverPageStyled>
      <div className="login-page__company">
        <NomadeLogoSection />
      </div>
      <div className="login-page__form-section">
        <h2>Recuperar contraseña</h2>
        <RecoverPasswordForm />
      </div>
    </RecoverPageStyled>
  );
};

export default RecoverPasswordPage;
