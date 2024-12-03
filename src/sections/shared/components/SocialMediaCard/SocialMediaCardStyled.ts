import styled from "styled-components";

const SocialMediaCardStyled = styled.article`
  box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 20px;
  position: relative;

  .stats-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .statsSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .social-card {
    &__edit-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 10px;
      font-weight: 700;
      color: ${(props) => props.theme.colors.darkBlue};
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      border: 2px solid ${(props) => props.theme.colors.darkBlue};
      width: fit-content;
      font-size: ${(props) => props.theme.fontsSize.__SSM};

      &:hover {
        color: ${(props) => props.theme.colors.light};
        background: ${(props) => props.theme.colors.darkBlue};
      }
    }

    &__title {
      letter-spacing: 1px;
    }

    &__data {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      padding-left: 40px;
      padding-top: 30px;
      padding-bottom: 40px;
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
