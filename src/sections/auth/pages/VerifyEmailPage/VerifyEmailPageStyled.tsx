import styled from "styled-components";

const VerifyEmailPageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;

  .verify-email-page__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    text-align: center;
  }

  .verify-email-page__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 450px;

    .verify-email-page__logo-image {
      width: 100%;
      max-width: 450px;
      height: auto;
      filter: brightness(0) saturate(100%) invert(14%) sepia(20%)
        saturate(1200%) hue-rotate(120deg) brightness(90%) contrast(95%);
    }
  }

  .verify-email-page__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    p {
      color: #243c34;
      font-size: 16px;
      font-family: Arial, sans-serif;
    }
  }

  .verify-email-page__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    p {
      color: #d32f2f;
      font-size: 16px;
      font-family: Arial, sans-serif;
      max-width: 500px;
    }
  }
`;

export default VerifyEmailPageStyled;
