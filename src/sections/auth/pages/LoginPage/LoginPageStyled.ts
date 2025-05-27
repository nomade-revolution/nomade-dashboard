import styled from "styled-components";

const LoginPageStyled = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .login-page {
    height: 100%;

    &__company {
      display: none;

      @media (min-width: 1000px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 40px;
        background: ${(props) => props.theme.colors.outerSpace};
        height: 100vh;
        width: 50%;
      }
    }

    &__slogan {
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__form-section {
      padding-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
      width: 100%;

      @media (min-width: 1000px) {
        padding: 40px;
        width: 50%;
      }
    }
  }
`;

export default LoginPageStyled;
