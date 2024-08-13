import styled from "styled-components";

const CollabsDetailPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 40px 90px;
  }

  @media (min-width: 1600px) {
    padding: 40px 50px;
    height: 100%;
  }

  .detail-collab {
    &__data {
      display: flex;
      gap: 40px;
    }

    &__stepper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background: ${(props) => props.theme.colors.lightGrey};
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      padding: 20px 40px;
      border-radius: 10px;
      width: 40%;
    }
  }
`;

export default CollabsDetailPageStyled;
