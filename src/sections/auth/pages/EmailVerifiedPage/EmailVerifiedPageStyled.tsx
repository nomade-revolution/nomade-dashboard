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
    max-width: 500px;
  }

  .email-verified-page__message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .email-verified-page__icon {
      font-size: 64px;
      margin-bottom: 0.5rem;
    }

    h1 {
      color: #243c34;
      font-size: 28px;
      font-weight: 600;
      font-family: Arial, sans-serif;
      margin: 0;
    }

    p {
      color: #243c34;
      font-size: 16px;
      font-family: Arial, sans-serif;
      margin: 0;
      line-height: 1.5;
    }
  }

  .email-verified-page__actions {
    margin-top: 1rem;
  }
`;

export default EmailVerifiedPageStyled;
