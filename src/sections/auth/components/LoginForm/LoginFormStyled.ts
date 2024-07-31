import styled from "styled-components";

const LoginFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: ${(props) => props.theme.fontsSize.__SM};
  width: 60%;

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    &__field {
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      border: 1px solid ${(props) => props.theme.colors.inputsBorderColors};
      height: ${(props) => props.theme.heights.inputs};
      padding: 0 10px;
    }
  }

  .login-form {
    &__submit {
      background: ${(props) => props.theme.colors.mainColor};
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: ${(props) => props.theme.fontWeights.mediumBold};
      height: ${(props) => props.theme.heights.inputs};
      border-radius: ${(props) => props.theme.borderRadius.submitButton};
      width: 100%;
    }

    &__label {
      color: ${(props) => props.theme.fontsColors.lightGrey};
    }

    &__forgot-password {
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__error-message {
      color: ${(props) => props.theme.fontsColors.error};
    }
  }
`;

export default LoginFormStyled;
