import styled from "styled-components";

const DropdownMenuStyled = styled.div`
  position: relative;

  .dropdown-menu {
    z-index: 5;
    box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 30px;
    right: 0px;
    background: ${(props) => props.theme.colors.light};
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 250px;
    border: 1px solid ${(props) => props.theme.borders.lightGrey};
    padding: 5px;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 120px;

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
  }

  .user-actions {
    padding-top: 40px;
    padding-bottom: 150px;
    border-top: 1px solid ${(props) => props.theme.borders.lightGrey};
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__section {
      display: flex;
      gap: 10px;
      padding: 10px;
    }

    &__icon {
      font-size: large;
    }
  }
`;

export default DropdownMenuStyled;
