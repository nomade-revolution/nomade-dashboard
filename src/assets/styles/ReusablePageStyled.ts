import styled from "styled-components";

const ReusablePageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  justify-content: center;
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
        justify-content: flex-end;
      }
    }

    &__filtersContainer {
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 10px;
      width: 100%;

      @media (min-width: 880px) {
        width: 100%;
        flex-direction: row;

        justify-content: space-between;
      }
    }

    &__filter {
      display: flex;
      align-items: flex-start;
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
        font-weight: bold;
        color: ${(props) => props.theme.colors.softGreen};
      }

      &--rejected {
        font-weight: bold;
        color: ${(props) => props.theme.colors.darkRed};
      }

      &--cancelled {
        font-weight: bold;
        color: ${(props) => props.theme.colors.red};
      }

      &--sent {
        font-weight: bold;
        color: ${(props) => props.theme.colors.darkBlue};
      }

      &--pending-nomade {
        font-weight: bold;
        color: blue;
      }

      &--pending-company {
        font-weight: bold;
        color: fuchsia;
      }

      &--done {
        font-weight: bold;
        color: green;
      }

      &--finished {
        font-weight: bold;
        color: ${(props) => props.theme.colors.purple};
      }

      &--incident {
        font-weight: bold;
        color: brown;
      }

      &--published {
        font-weight: bold;
        color: ${(props) => props.theme.colors.softGreen};
      }
    }

    &--modification {
      color: teal;
    }

    &--received {
      color: lightBlue;
    }

    &--published {
      color: gold;
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

    &__progress {
      position: relative;
    }

    &__progress-percentage {
      position: absolute;
      top: 0;
      font-weight: 700;
    }

    &__plan {
      &--basic {
        font-weight: 700;
        color: fuchsia;
      }

      &--standard {
        font-weight: 700;
        color: blue;
      }

      &--premium {
        font-weight: 700;
        color: orange;
      }

      &--pending {
        font-weight: 700;
        color: red;
      }
    }

    &__start-date {
      color: green;
      font-weight: 700;
      opacity: 0.6;
    }

    &__end-date {
      color: red;
      font-weight: 700;
      opacity: 0.6;
    }
  }

  .filterBox {
    display: flex;
    align-items: center;
    width: 250px;
  }

  .plans-page {
    &__mensual {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .filters {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;

    &__filter {
      display: flex;
      align-items: center;
      gap: 5px;
      background: ${(props) => props.theme.colors.mainColor};
      padding: 5px 10px;
      color: ${(props) => props.theme.colors.light};
      font-size: ${(props) => props.theme.fontsSize.__SM};
      width: fit-content;
      border-radius: 5px;
    }
  }
`;

export default ReusablePageStyled;
