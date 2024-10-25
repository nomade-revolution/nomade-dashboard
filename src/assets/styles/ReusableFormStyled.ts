import styled from "styled-components";

const ReusableFormStyled = styled.form`
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
    &__add-contact {
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
    &__field-large,
    &__field-textarea {
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
    &__field-textarea {
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

      @media (min-width: 1000px) {
        flex-direction: unset;
        flex-wrap: wrap;
      }
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
      color: #4287f5;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 5px;

      &:hover {
        text-decoration: underline;
      }
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
  }
`;

export default ReusableFormStyled;
