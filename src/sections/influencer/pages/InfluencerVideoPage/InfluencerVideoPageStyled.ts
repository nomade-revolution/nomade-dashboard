import styled from "styled-components";

const InfluencerDetailPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  height: auto;
  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 50px 40px;
  }

  @media (min-width: 1600px) {
    padding: 70px 70px;
  }

  .influencer-detail {
    &__info {
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: ${(props) => props.theme.colors.lightGrey};
      border-radius: 10px;
      padding: 10px;
      padding-top: 0px;
    }
  }
`;

export default InfluencerDetailPageStyled;
