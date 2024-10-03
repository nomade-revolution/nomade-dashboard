import styled from "styled-components";

const ReusablePageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
  max-width: 100%;
  color: ${(props) => props.theme.fontsColors.dashBoard};

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 40px 40px;
  }

  @media (min-width: 1600px) {
    padding: 40px 50px;
    height: 100%;
  }

  .dashboard {
    &__table {
      display: none;

      @media (min-width: 1000px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        justify-content: center;
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

    &__type-section {
      font-weight: bold;

      &--influencer {
        color: ${(props) => props.theme.colors.orange};
      }

      &--nomade {
        color: ${(props) => props.theme.colors.mainColor};
      }

      &--company {
        color: ${(props) => props.theme.colors.purple};
      }

      &--restaurant {
        color: ${(props) => props.theme.colors.darkRed};
      }

      &--delivery {
        color: ${(props) => props.theme.colors.softGreen};
      }

      &--brand {
        color: ${(props) => props.theme.colors.orange};
      }

      &--lodging {
        color: ${(props) => props.theme.colors.tagsBlue};
      }

      &--activity {
        color: ${(props) => props.theme.colors.red};
      }
    }

    &__state-section {
      font-weight: bold;

      &--accepted {
        color: ${(props) => props.theme.colors.softGreen};
      }

      &--rejected {
        color: ${(props) => props.theme.colors.darkRed};
      }

      &--cancelled {
        color: ${(props) => props.theme.colors.red};
      }

      &--sent {
        color: ${(props) => props.theme.colors.darkBlue};
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

    &__state-active {
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__state-inactive {
      color: ${(props) => props.theme.fontsColors.lightGrey};
    }

    &__search {
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 10px;
      width: 100%;

      @media (min-width: 1000px) {
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        width: 100%;
        gap: 100px;
      }
    }

    &__search-user {
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 10px;
      width: 100%;

      @media (min-width: 1000px) {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        width: 84%;
      }
    }

    &__web,
    &__country,
    &__influencer {
      font-weight: bold;
    }
  }
`;

export default ReusablePageStyled;
