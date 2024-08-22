import styled from "styled-components";

const InfluencerDetailPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  height: auto;

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 50px 100px;
  }

  @media (min-width: 1600px) {
    padding: 70px 200px;
  }

  .influencer-detail {
    &__title {
      border-bottom: 2px solid ${(props) => props.theme.colors.mainColor};
      padding-bottom: 10px;
      width: 20%;
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      background-color: ${(props) => props.theme.colors.lightGrey};
      padding: 20px;
      border-radius: 10px;

      @media (min-width: 1000px) {
        display: block;
        position: relative;
        box-shadow: none;
        background-color: none;
        padding: 30px;
      }
    }

    &__avatar {
      border-radius: 50%;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);

      @media (min-width: 1000px) {
        position: absolute;
        left: -50px;
        bottom: 150px;
      }
    }
  }
`;

export default InfluencerDetailPageStyled;
