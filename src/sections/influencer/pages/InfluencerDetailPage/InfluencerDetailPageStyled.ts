import styled from "styled-components";

const InfluencerDetailPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  height: 100vh;

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 200px 150px;
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
      position: relative;
    }

    &__avatar {
      border-radius: 50%;
      position: absolute;
      bottom: 100px;
      left: -50px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
    }
  }
`;

export default InfluencerDetailPageStyled;
