import { styled } from "styled-components";

const PlanFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  .update-plan {
    &__title {
      color: ${(props) => props.theme.colors.mainColor};
    }
    &__months,
    &__calendar {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    &__label {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      font-weight: 700;
    }

    &__date-picker,
    &__field {
      border-radius: 10px;
      height: 40px;
      padding: 10px;
      border: 1px solid ${(props) => props.theme.colors.mainColor};
      width: 250px;
      font-family: inherit;
    }
  }

  .btn,
  .btn-success,
  .btn-error {
    background: ${(props) => props.theme.colors.mainColor};
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.light};
    min-width: 150px;
  }

  .btn-success {
    background: ${(props) => props.theme.colors.softGreen};
  }

  .btn-error {
    background: ${(props) => props.theme.colors.red};
  }
`;

export default PlanFormStyled;
