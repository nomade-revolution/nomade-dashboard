import styled from "styled-components";

const OfferResumeStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: ${(props) => props.theme.fontsSize.__SM};

  .offer-resume {
    &__content {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 20px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    &__text-icon {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &__section-row {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &__text-bold {
      font-weight: 700;
    }

    &__notice {
    }
  }

  .time {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    width: 90%;

    &__shift {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  h4 {
    padding: 0;
    margin: 0;
  }
`;

export default OfferResumeStyled;
