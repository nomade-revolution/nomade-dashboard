import styled from "styled-components";

interface Props {
  $isMinimized: boolean;
}

const SideBarStyled = styled.div<Props>`
  display: none;

  @media (min-width: 1000px) {
    padding: ${(props) => (props.$isMinimized ? "5px" : "20px")};
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    background: white;
    z-index: 1;
    color: ${(props) => props.theme.fontsColors.dashBoard};
    overflow-y: scroll;
    box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.2);
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
    padding-bottom: 100px;
    position: relative;
    padding-top: ${(props) => (props.$isMinimized ? "30px" : 0)};

    &__section,
    &__section--active {
      display: flex;
      width: 100%;
      justify-content: ${(props) =>
        props.$isMinimized ? "unset" : "space-between"};
      gap: ${(props) => (props.$isMinimized ? "8px" : 0)};
      padding: ${(props) => (props.$isMinimized ? "10px" : "10px")};
      align-items: center;
    }

    &__section--active {
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      background: ${(props) => props.theme.colors.backgroundPages};
      border-radius: ${(props) => props.theme.borderRadius.badges};
      font-weight: 700;
      color: ${(props) => props.theme.fontsColors.mineralGreen};
    }

    &__subsection {
      display: flex;
      gap: 10px;
    }

    &__quantity {
      padding: 2px;
      background: ${(props) => props.theme.colors.paleLime};
      width: ${(props) => (props.$isMinimized ? "15px" : "40px")};
      text-align: center;
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      font-size: ${(props) =>
        props.$isMinimized
          ? props.theme.fontsSize.__XS
          : props.theme.fontsSize.__SM};
      border-radius: ${(props) =>
        props.$isMinimized ? "50%" : props.theme.borderRadius.badges};
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__icon,
    &__icon--selected {
      font-size: large;
    }

    &__icon--selected {
      color: ${(props) => props.theme.fontsColors.mineralGreen};
    }

    &__name {
      letter-spacing: 0.8px;
    }

    &__hide {
      position: absolute;
      right: ${(props) => (props.$isMinimized ? "-5px" : "-20px")};
      top: ${(props) => (props.$isMinimized ? "5px" : "-40px")};
      padding: 5px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.2);
      border-radius: 5px 0 0 5px;
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
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &__name--selected {
      font-weight: 700;
      letter-spacing: 1px;
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__section {
      display: flex;
      gap: 10px 0;
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
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .subsection {
    display: flex;
    justify-content: flex-end;
    text-transform: capitalize;
    font-weight: bold;
    padding-bottom: 10px;
    padding-right: 10px;
    border-bottom: 1px solid
      ${(props) => props.theme.fontsColors.corporativeColor};
    animation: fadeInLeft 1s ease-in-out;
  }
`;

export default SideBarStyled;
