import styled from "styled-components";

const CustomersPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 40px 30px;
  }

  @media (min-width: 1600px) {
    padding: 40px 50px;
    height: 100%;
  }

  .dashboard {
    &__customers-table {
      display: none;

      @media (min-width: 1000px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
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

    &__searchContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      @media (min-width: 880px) {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }

    &__title {
      padding-right: 20px;
    }

    &__image {
      object-fit: cover;
    }

    &__description {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      width: 460px;
    }

    &__tags,
    &__subcategories {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      max-width: 300px;
    }

    &__tags {
      color: ${(props) => props.theme.colors.tagsBlue};
    }

    &__offers-button {
      display: flex;
      align-items: center;
      gap: 7px;
      background: ${(props) => props.theme.colors.mainColor};
      padding: 8px;
      border-radius: ${(props) => props.theme.borderRadius.badges};
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
    }

    &__location {
      font-size: large;
      color: ${(props) => props.theme.colors.darkRed};
    }

    &__category {
      background: ${(props) => props.theme.colors.grey};
      padding: 3px 8px;
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      font-size: small;
    }
  }
`;

export default CustomersPageStyled;
