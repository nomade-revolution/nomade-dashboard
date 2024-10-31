import styled from "styled-components";

const OfferSchedulingStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .scheduling {
    &--restaurant {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    &__section {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__timetable {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
    }

    &__timetable-time {
      display: flex;
      align-items: center;
    }

    &__timetable-column {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-left: 30px;
    }

    &__timetable-check {
      width: 20%;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    &__btn-container {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }

    &__save-btn {
      color: ${(props) => props.theme.colors.mainColor};
      border: 2px solid ${(props) => props.theme.colors.mainColor};
      font-weight: 700;
      padding: 10px;
      border-radius: 10px;
      min-width: 150px;
      height: 40px;

      &:hover {
        color: ${(props) => props.theme.colors.light};
        border: none;
        background: ${(props) => props.theme.colors.mainColor};
      }
    }

    &__title {
      display: none;

      @media (min-width: 1000px) {
        display: block;
      }
    }

    &__times {
      display: flex;
      flex-direction: column;
      width: 100%;

      @media (min-width: 1000px) {
        flex-direction: row;
        width: 100%;
      }
    }
  }
`;

export default OfferSchedulingStyled;
