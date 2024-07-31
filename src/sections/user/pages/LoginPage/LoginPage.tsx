import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = (): React.ReactElement => {
  return (
    <LoginPageStyled className="login-page">
      <div className="login-page__company">
        <ImageCustom
          alt="Fresatitan logo"
          className="side-bar__image"
          height={70}
          width={250}
          image="/main_logo.png"
        />
        <span className="login-page__slogan">
          Area de Clientes y Gestión de pedidos
        </span>
        <div className="login-page__circles-container">
          <div className="login-page__big-circle"></div>
          <div className="login-page__small-circle"></div>
        </div>
      </div>
      <div className="login-page__form-section">
        <h2>Inicia sesión</h2>
        <LoginForm />
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
