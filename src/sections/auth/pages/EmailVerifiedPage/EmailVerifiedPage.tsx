import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import EmailVerifiedPageStyled from "./EmailVerifiedPageStyled";

const EmailVerifiedPage = (): React.ReactElement => {
  return (
    <EmailVerifiedPageStyled className="email-verified-page">
      <div className="email-verified-page__content">
        <div className="email-verified-page__logo">
          <ImageCustom
            alt="Nomade logo"
            className="email-verified-page__logo-image"
            image="/main_logo.png"
            width={450}
            height={166}
          />
        </div>
        <div className="email-verified-page__message">
          <span className="email-verified-page__title">
            <span className="email-verified-page__icon">✅</span>
            Email verificado
          </span>
        </div>
      </div>
    </EmailVerifiedPageStyled>
  );
};

export default EmailVerifiedPage;
