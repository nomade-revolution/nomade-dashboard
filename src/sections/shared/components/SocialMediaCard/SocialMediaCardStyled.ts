import styled from "styled-components";

const SocialMediaCardStyled = styled.article`
  box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 20px;

  .social-card {
    &__title {
      letter-spacing: 1px;
    }

    &__data {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__text-icon,
    &__text-link {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 700;
    }

    &__text-link {
      font-weight: 400;

      &:hover {
        font-weight: 700;
        text-decoration: underline;
      }
    }

    &__section-title {
      color: ${(props) => props.theme.colors.mainColor};
    }
  }
`;

export default SocialMediaCardStyled;
