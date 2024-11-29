import styled from "styled-components";

interface Props {
  $isMultiple?: boolean;
}

const ReusableFormStyled = styled.form<Props>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
  background: ${(props) => props.theme.colors.light};
  padding: 30px;
  border-radius: ${(props) => props.theme.borderRadius.badges};
  box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);

  .datasheet-form {
    &__content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    &__title {
      color: ${(props) => props.theme.colors.mainColor};
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

    &__submit {
      background: ${(props) => props.theme.colors.mainColor};
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      padding: 10px 20px;
      width: 100%;
      border-radius: ${(props) => props.theme.borderRadius.submitButton};

      @media (min-width: 1000px) {
        width: ${(props) => props.theme.widths.datasheetLargeInputs};
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    &__addresses {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 30px;
    }

    &__address-section,
    &__contact-section {
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }

    &__add-address,
    &__add-contact,
    &__save-contact {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      font-weight: 700;
      background: ${(props) => props.theme.colors.darkBlue};
      color: ${(props) => props.theme.fontsColors.light};
      border-radius: ${(props) => props.theme.borderRadius.badges};
      width: fit-content;

      &--icon {
        font-size: large;
      }
    }

    &__save-contact {
      background: ${(props) => props.theme.colors.mainColor};
    }

    &__address-mssg,
    &__contact-mssg {
      color: ${(props) => props.theme.colors.softGreen};
      font-weight: 700;
      font-size: ${(props) => props.theme.fontsSize.__SM};
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &__footer {
      display: flex;
      width: 100%;
      gap: 30px;
    }

    &__suggestions-dropdown {
      position: absolute;
      top: 70px;
      z-index: 10;
      background: white;
      width: 400px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      padding: 10px;
      border-radius: 10px;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__success {
      background: ${(props) => props.theme.colors.softGreen};
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      padding: 10px 20px;
      width: 100%;
      border-radius: ${(props) => props.theme.borderRadius.submitButton};

      @media (min-width: 1000px) {
        width: ${(props) => props.theme.widths.datasheetLargeInputs};
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    &__error {
      background: ${(props) => props.theme.colors.red};
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      padding: 10px 20px;
      width: 100%;
      border-radius: ${(props) => props.theme.borderRadius.submitButton};

      @media (min-width: 1000px) {
        width: ${(props) => props.theme.widths.datasheetLargeInputs};
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    &__contact {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-bottom: ${(props) =>
        props.$isMultiple ? "2px solid black" : "none"};
      padding-bottom: 20px;
      width: 100%;

      &:last-child {
        border-bottom: none;
      }
    }

    &__btns {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }

  .form-subsection {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    position: relative;

    &__label {
      font-size: small;
      color: ${(props) => props.theme.fontsColors.lightGrey};
    }

    &__field,
    &__field-large,
    &__field-textarea,
    &__field-large--offer,
    &__field-textarea--offer,
    &__field-date,
    &__field-large--company,
    &__field-textarea--company {
      display: flex;
      align-items: center;
      height: 40px;
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      padding: 0 8px;
      width: 100%;
      gap: 40px;
    }

    &__field-large,
    &__field-textarea,
    &__field-textarea--offer {
      width: 100%;
      @media (min-width: 1000px) {
        width: ${(props) => props.theme.widths.datasheetSmallerInputs};
      }

      @media (min-width: 1200px) {
        width: ${(props) => props.theme.widths.datasheetSmallerInputs};
      }

      @media (min-width: 1600px) {
        width: ${(props) => props.theme.widths.datasheetLargeInputs};
      }
    }

    &__field-textarea--offer,
    &__field-textarea--company {
      height: 200px;

      width: 100%;
      font-family: inherit;
      padding: 10px;

      @media (min-width: 1600px) {
        width: 400px;
      }
    }

    &__field-large--company,
    &__field-textarea--company {
      width: 100%;
    }

    &__field-large--offer {
      font-weight: 700;
      font-family: inherit;
      width: 100%;

      @media (min-width: 1600px) {
        width: 400px;
      }
    }

    &__field-date {
      height: 55px;
    }

    &__taxes-item {
      font-size: ${(props) => props.theme.fontsSize.__SMM};
    }

    &__checkbox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: left;
      gap: 20px;
    }

    &__field-textarea {
      height: 150px;
      padding: 10px;
      font-family: inherit;
    }

    &__field-image {
      width: 90%;

      @media (min-width: 1000px) {
        width: 100%;
      }
    }

    &__field--small,
    &__field--small-time {
      display: flex;
      align-items: center;
      height: 40px;
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      padding: 0 8px;
      width: 70%;
      gap: 40px;
    }

    &__password {
      position: relative;
    }

    &__password-btn {
      position: absolute;
      top: 12px;
      right: 5px;
    }

    &__error-message {
      color: red;
      font-weight: 700;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea {
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none;
  }

  .leads-form {
    overflow-y: scroll;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (min-width: 1000px) {
      height: 800px;
    }
  }

  .lead-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__section {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }

    &__section-link {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__title {
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__thirdparty-link {
      display: flex;
      flex-direction: column;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__link {
      color: ${(props) => props.theme.colors.mainColor};
      display: flex;
      align-items: center;
      gap: 5px;
      text-decoration: underline;
    }

    &__checkbox-container {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &__footer-mssg {
      font-size: ${(props) => props.theme.fontsSize.__S};
    }

    &__field,
    &__field-textarea {
      display: flex;
      align-items: center;
      height: 40px;
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      padding: 0 8px;
      width: 90%;
      gap: 40px;
    }

    &__field-textarea {
      height: 150px;
      padding: 10px;
      font-family: inherit;
    }

    &__select {
      width: 90%;
    }

    &__address {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: ${(props) => props.theme.fontsSize.__SM};
      border-radius: 10px;
      width: fit-content;
      font-weight: 700;
    }
  }

  .form-offer {
    display: flex;
    flex-direction: column-reverse;
    gap: 30px;
    width: 100%;
    justify-content: space-between;

    @media (min-width: 1600px) {
      flex-direction: row;
    }

    &__texts {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__select-data {
      display: flex;
      flex-direction: column;

      gap: 20px;
    }

    &__selects {
      display: flex;
      flex-direction: column;
      gap: 30px;
      width: 100%;

      @media (min-width: 1000px) {
        flex-direction: row;
      }
    }

    &__locations {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .stats {
    &__section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    &__sub-section {
      display: flex;
      align-items: flex-end;
      gap: 20px;
    }

    &__field {
      display: flex;
      align-items: center;
      height: 57px;
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      padding: 0 8px;
      width: 100%;
    }

    &__title {
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__list {
      width: 100%;
    }

    &__list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    &__list-text {
      width: 20%;
      font-weight: 700;
      color: ${(props) => props.theme.colors.darkBlue};
    }
  }
`;

export default ReusableFormStyled;
