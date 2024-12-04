import styled from "styled-components";

const ReusablePageStyled = styled.main`
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  width: 100%;

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 20px 40px;
    max-width: fit-content;
  }

  @media (min-width: 1600px) {
    padding: 10px 50px;
    height: 100%;
    max-width: fit-content;
  }

  .dashboard {
    width: 100%;

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
        justify-content: space-between;
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

    &__selectsContainer {
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      gap: 10px;
      width: 100%;

      @media (min-width: 880px) {
        width: 90%;
        flex-direction: row;
      }
    }

    &__btns-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__name {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      font-weight: 700;
      width: 100%;
      text-align: left;
    }

    &__select {
      padding-left: 40px;
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
      color: ${(props) => props.theme.colors.purple};
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      font-size: small;
      font-weight: 700;
      text-align: left;
      display: flex;
      justify-content: flex-start;
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
        justify-content: space-between;
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
        width: 100%;
      }
    }

    &__web,
    &__country,
    &__influencer {
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

    &__link-sent {
      color: ${(props) => props.theme.colors.softGreen};
      font-weight: 700;
    }

    &__link-pending {
      font-weight: 700;
      color: ${(props) => props.theme.colors.red};
    }

    &__date {
      font-weight: 700;
    }

    &__social-media {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 5px;
    }

    &__status {
      &--active {
        color: green;
        font-weight: 700;
      }

      &--inactive {
        color: red;
        font-weight: 700;
      }

      &--pending {
        color: orange;
        font-weight: 700;
      }

      &--standby {
        color: blueviolet;
        font-weight: 700;
      }
    }

    &__plan {
      &--mensual {
        font-weight: 700;
        color: chocolate;
      }

      &--trimestral {
        font-weight: 700;
        color: yellowgreen;
      }
    }

    &__role {
      &--admin {
        font-weight: 700;
        color: ${(props) => props.theme.colors.mainColor};
      }

      &--manager {
        font-weight: 700;
        color: ${(props) => props.theme.colors.darkRed};
      }
    }

    &__link-icon {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      text-align: left;
      gap: 2px;
      text-decoration: underline;
    }

    &__icon {
      width: 30px;
      height: 20px;
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__email {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      width: 100%;
      text-align: left;
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

    &__show-calendar {
      display: flex;
      gap: 5px;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
    }

    &__calendar {
      position: absolute;
      right: 30px;
      top: 215px;
      background: white;
      width: 90%;
      z-index: 10;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.3);

      @media (min-width: 1000px) {
        width: 20%;
        right: 20px;
        top: 110px;
      }
    }

    &__filter-btnSection {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      gap: 8px;
      align-items: center;
    }

    &__filter-btn {
      background: ${(props) => props.theme.colors.darkBlue};
      padding: 10px;
      border-radius: 5px;
      color: ${(props) => props.theme.colors.light};
      font-weight: 700;
    }

    &__filter-active {
      background: ${(props) => props.theme.colors.mainColor};
      padding: 2px 5px;
      width: fit-content;
      font-size: ${(props) => props.theme.fontsSize.__SM};
      font-weight: 700;
      display: flex;
      align-items: center;
      border-radius: 3px;
      color: ${(props) => props.theme.colors.light};
    }

    &__date-picker {
      border-radius: 10px;
      height: 40px;
      padding: 10px;
      align-self: left;
      border: 1px solid ${(props) => props.theme.colors.mainColor};
    }

    &__filter-close {
      display: flex;
      align-items: center;
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
