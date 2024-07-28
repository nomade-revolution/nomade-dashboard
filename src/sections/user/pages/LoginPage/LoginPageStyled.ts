import styled from "styled-components";

const LoginPageStyled = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .login-page {
    height: 100%;

    &__company {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 40px;
      background: ${(props) => props.theme.colors.secondaryColor};
      height: 100vh;
      width: 50%;
    }

    &__slogan {
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__form-section {
      width: 50%;
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }

    &__circles-container {
      position: relative;
      width: 100%;
      height: 50%;
    }

    &__big-circle,
    &__small-circle {
      position: absolute;
      background: ${(props) => props.theme.colors.mainColor};
      border-radius: 50%;
      opacity: 0.3;
    }

    &__big-circle {
      width: 30rem;
      height: 30rem;
      top: 9%;
      left: 20%;

      @media (max-width: 1600px) {
        width: 20rem;
        height: 20rem;
        left: 12%;
        top: 0;
      }
    }

    &__small-circle {
      width: 14rem;
      height: 14rem;
      top: 57%;
      left: 52%;
      z-index: 1;

      @media (max-width: 1600px) {
        width: 12rem;
        height: 12rem;
        left: 48%;
        top: 47%;
      }
    }
  }
`;

export default LoginPageStyled;
