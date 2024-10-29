import styled from "styled-components";

const OfferSchedulingStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
      width: 40%;
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
  }
`;

export default OfferSchedulingStyled;
