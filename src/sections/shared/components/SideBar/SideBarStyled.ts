import styled from "styled-components";

const SideBarStyled = styled.div`
  display: none;

  @media (min-width: 1000px) {
    padding: 20px;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    background: white;
    z-index: 1;
    color: ${(props) => props.theme.fontsColors.dashBoard};
  }

  .side-bar {
    &__image {
      @media (max-width: 1200px) {
        width: 150px;
        height: 25px;
      }
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__section,
    &__section--active {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
    }

    &__section--active {
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      background: ${(props) => props.theme.colors.backgroundPages};
      border-radius: ${(props) => props.theme.borderRadius.badges};
      font-weight: 700;
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__subsection {
      display: flex;
      gap: 10px;
    }

    &__quantity {
      padding: 4px 2px;
      background: ${(props) => props.theme.colors.mainColor};
      width: 40px;
      text-align: center;
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      font-size: ${(props) => props.theme.fontsSize.__SM};
      border-radius: ${(props) => props.theme.borderRadius.badges};
    }

    &__icon,
    &__icon--selected {
      font-size: large;
    }

    &__icon--selected {
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__name {
      letter-spacing: 0.8px;
    }
  }

  .user-actions {
    padding-top: 20px;
    border-top: 1px solid ${(props) => props.theme.borders.lightGrey};
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__name {
      letter-spacing: 1px;
      color: ${(props) => props.theme.fontsColors.grey};
    }

    &__name--selected {
      font-weight: 700;
      letter-spacing: 1px;
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__section {
      display: flex;
      gap: 10px;
      width: 100%;
      padding: 10px;
      align-items: center;
    }

    &__section--active {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px;
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      background: ${(props) => props.theme.colors.backgroundPages};
      border-radius: ${(props) => props.theme.borderRadius.badges};
    }

    &__icon,
    &__icon--selected {
      font-size: large;
    }

    &__icon--selected {
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__name-logout {
      color: red;
      font-size: medium;
      padding: 0;
      font-weight: 700;
      letter-spacing: 1px;
    }
  }
`;

export default SideBarStyled;
