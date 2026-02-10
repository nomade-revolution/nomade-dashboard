import styled from "styled-components";

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 25px;

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
      color: ${(props) => props.theme.colors.light};
    }

    &__profile-subIcon {
      color: ${(props) => props.theme.colors.light};
    }

    &__image {
      display: flex;
      max-width: min(144px, 40vw);
      width: auto;
      height: auto;
      object-fit: contain;
      filter: brightness(0) invert(1);
      margin-bottom: 6px;

      @media (min-width: 1000px) {
        display: none;
      }
    }
  }
`;

export default HeaderStyled;
