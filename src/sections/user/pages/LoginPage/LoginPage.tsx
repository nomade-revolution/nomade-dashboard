import LoginForm from "../../components/LoginForm/LoginForm";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = (): React.ReactElement => {
  return (
    <LoginPageStyled className="login-page">
      <div className="login-page__company">
        {/* <ImageCustom
          alt="Fresatitan logo"
          className=""
          height={60}
          width={400}
          image="/Fresatitan-Logo.png"
        /> */}
        <h1 style={{ fontSize: "40px" }}>Nomade</h1>
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
