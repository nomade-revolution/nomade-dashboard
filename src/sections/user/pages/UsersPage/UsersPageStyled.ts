import styled from "styled-components";

const UserPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 90px 30px;
  }

  @media (min-width: 1600px) {
    padding: 90px 50px;
    height: 100%;
  }

  .dashboard {
    &__orders-table {
      display: none;

      @media (min-width: 1000px) {
        width: 80%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
      }
    }
    &__search {
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 10px;
      width: 100%;

      @media (min-width: 1000px) and (max-width: 1200px) {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        width: 85%;
      }

      @media (min-width: 1200px) and (max-width: 1600px) {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        width: 70%;
      }

      @media (min-width: 1600px) {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        width: 53%;
      }
    }

    &__mobile {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;

      @media (min-width: 1000px) {
        display: none;
      }
    }

    &__create {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      font-weight: 700;
      background: ${(props) => props.theme.colors.darkBlue};
      color: ${(props) => props.theme.fontsColors.light};
      border-radius: ${(props) => props.theme.borderRadius.badges};
      width: fit-content;

      &--icon {
        font-size: large;
      }
    }
  }
`;

export default UserPageStyled;
