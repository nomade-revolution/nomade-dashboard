import styled from "styled-components";

const NomadeLogoSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 100%;
  height: 100%;

  .nomade-section {
    &__slogan {
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__circles-container {
      position: relative;
      width: 100%;
      height: 50%;
    }

    &__big-circle,
    &__small-circle {
      position: absolute;
      background: ${(props) => props.theme.colors.mainColor};
      border-radius: 50%;
      opacity: 0.3;
    }

    &__big-circle {
      width: 30rem;
      height: 30rem;
      top: 9%;
      left: 20%;

      @media (max-width: 1600px) {
        width: 20rem;
        height: 20rem;
        left: 12%;
        top: 0;
      }
    }

    &__small-circle {
      width: 14rem;
      height: 14rem;
      top: 57%;
      left: 52%;
      z-index: 1;

      @media (max-width: 1600px) {
        width: 12rem;
        height: 12rem;
        left: 48%;
        top: 47%;
      }
    }
  }
`;

export default NomadeLogoSectionStyled;
