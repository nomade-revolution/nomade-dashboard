import styled from "styled-components";

const InfluencerSocialMediaStyles = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80px;

  @media (min-width: 1000px) {
    flex-direction: row;
  }

  .social-media {
    &__data {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    &__followers {
      font-size: ${(props) => props.theme.fontsSize.__SSM};
    }
  }
`;

export default InfluencerSocialMediaStyles;
