import styled from "styled-components";

const InfluencerSocialMediaStyles = styled.ul`
  display: flex;
  justify-content: space-between;

  .social-media {
    &__data {
      display: flex;
      flex-direction: column;
      gap: 8px;

      @media (min-width: 1000px) {
        flex-direction: row;
      }
    }
  }
`;

export default InfluencerSocialMediaStyles;
