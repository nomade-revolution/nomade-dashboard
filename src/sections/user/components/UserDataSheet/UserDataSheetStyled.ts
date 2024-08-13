import styled from "styled-components";

const UserDatasheetStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
  background: ${(props) => props.theme.colors.light};
  padding: 30px;
  border-radius: ${(props) => props.theme.borderRadius.badges};
  box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);

  .datasheet-form {
    &__main-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 50px 0;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
    }

    &__section {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 20px;

      @media (min-width: 1000px) and (max-width: 1600px) {
        width: 80%;
        flex-direction: row;
      }

      @media (min-width: 1600px) {
        gap: 40px;
        flex-direction: row;
      }
    }

    &__submitButton {
      background: ${(props) => props.theme.colors.mainColor};
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      padding: 10px 20px;
      width: 100%;
      border-radius: ${(props) => props.theme.borderRadius.submitButton};
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      @media (min-width: 1000px) {
        width: ${(props) => props.theme.widths.datasheetSmallInputs};
      }
    }

    &__user-icon {
      font-size: ${(props) => props.theme.fontsSize.notFoundIcon};
    }
  }

  .form-subsection {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__label {
      font-size: small;
      color: ${(props) => props.theme.fontsColors.lightGrey};
    }

    &__field,
    &__field-large {
      display: flex;
      align-items: center;
      height: 40px;
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      padding: 0 8px;
      width: 100%;
      gap: 40px;

      @media (min-width: 1000px) and (max-width: 1600px) {
        width: ${(props) => props.theme.widths.datasheetSmallestInputs};
      }

      @media (min-width: 1600px) {
        width: ${(props) => props.theme.widths.datasheetSmallInputs};
      }
    }

    &__field-large {
      width: 100%;
      @media (min-width: 1000px) {
        width: ${(props) => props.theme.widths.datasheetSmallerInputs};
      }

      @media (min-width: 1200px) {
        width: ${(props) => props.theme.widths.datasheetSmallInputs};
      }

      @media (min-width: 1600px) {
        width: ${(props) => props.theme.widths.datasheetLargeInputs};
      }
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default UserDatasheetStyled;
