import NomadeLogoSection from "sections/shared/components/NomadeLogoSection/NomadeLogoSection";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = (): React.ReactElement => {
  return (
    <LoginPageStyled className="login-page">
      <div className="login-page__company">
        <NomadeLogoSection />
      </div>
      <div className="login-page__form-section">
        <h2>Inicia sesión</h2>
        <LoginForm />
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
