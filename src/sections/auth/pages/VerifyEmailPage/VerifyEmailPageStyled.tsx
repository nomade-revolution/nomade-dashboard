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
`;

export default VerifyEmailPageStyled;
