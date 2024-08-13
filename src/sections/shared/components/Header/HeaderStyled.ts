import styled from "styled-components";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 1000px) {
    display: none;
  }

  .header {
    &__button-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    &__button {
      display: flex;
      align-items: center;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
    }

    &__icons-section {
      display: flex;
      align-items: center;
      padding-top: 10px;
      position: relative;
    }

    &__profile-icon {
      font-size: ${(props) => props.theme.fontsSize.__XXL};
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__image {
      display: flex;

      @media (min-width: 1000px) {
        display: none;
      }
    }
  }
`;

export default HeaderStyled;
