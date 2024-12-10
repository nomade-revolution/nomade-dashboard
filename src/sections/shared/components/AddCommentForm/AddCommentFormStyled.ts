import styled from "styled-components";

const AddCommentFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  gap: 40px;
  font-size: ${(props) => props.theme.fontsSize.__SM};
  padding: 20px;
  min-height: 250px;
  min-width: 600px;

  .buttonsContainer {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: space-between;
  }

  .cancelButton {
    background: ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.fontsColors.light};
    font-weight: ${(props) => props.theme.fontWeights.mediumBold};
    height: ${(props) => props.theme.heights.inputs};
    border-radius: 5px;
    width: 100%;
  }

  @media (min-width: 1000px) {
    width: 60%;
  }

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
      height: 100px;
      text-align: start;
    }
  }

  .login-form {
    &__submit {
      background: ${(props) => props.theme.colors.mainColor};
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: ${(props) => props.theme.fontWeights.mediumBold};
      height: ${(props) => props.theme.heights.inputs};
      border-radius: 5px;
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

export default AddCommentFormStyled;
