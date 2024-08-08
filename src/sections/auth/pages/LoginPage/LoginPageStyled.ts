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
  }
`;

export default LoginPageStyled;
