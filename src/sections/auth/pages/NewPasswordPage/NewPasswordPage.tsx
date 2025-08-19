import NewPasswordForm from "sections/auth/components/NewPasswordForm/NewPasswordForm";
import NewPasswordPageStyled from "./NewPasswordPageStyled";
import NomadeLogoSection from "sections/shared/components/NomadeLogoSection/NomadeLogoSection";

const NewPasswordPage = () => {
  return (
    <NewPasswordPageStyled>
      <div className="login-page__company">
        <NomadeLogoSection />
      </div>
      <div className="login-page__form-section">
        <h2>Nueva contraseña</h2>
        <NewPasswordForm />
      </div>
    </NewPasswordPageStyled>
  );
};

export default NewPasswordPage;
