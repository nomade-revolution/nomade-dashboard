import styled from "styled-components";

const EmailVerifiedPageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;

  .email-verified-page__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    text-align: center;
  }

  .email-verified-page__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 450px;

    .email-verified-page__logo-image {
      width: 100%;
      max-width: 450px;
      height: auto;
      filter: brightness(0) saturate(100%) invert(14%) sepia(20%)
        saturate(1200%) hue-rotate(120deg) brightness(90%) contrast(95%);
    }
  }

  .email-verified-page__message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .email-verified-page__title {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #243c34;
    font-size: 18px;
    font-weight: 500;
    font-family: Arial, sans-serif;
    margin: 0;
  }

  .email-verified-page__icon {
    font-size: 18px;
  }
`;

export default EmailVerifiedPageStyled;
