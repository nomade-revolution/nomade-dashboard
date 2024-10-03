import styled from "styled-components";

const ReusableStepperStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .stepper {
    &__btn-container {
      display: flex;
      justify-content: flex-end;
    }

    &__state-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      background: ${(props) => props.theme.colors.orange};
      padding: 4px 20px;
      border-radius: 5px;
      font-weight: 700;
    }
  }
`;

export default ReusableStepperStyled;
