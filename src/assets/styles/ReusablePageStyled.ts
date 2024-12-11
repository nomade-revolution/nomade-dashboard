import styled from "styled-components";

const ReusablePageStyled = styled.main`
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  width: 100%;

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 20px 40px;
  }

  @media (min-width: 1600px) {
    padding: 20px 50px;
    height: 100%;
  }

  .dashboard {
    width: 100%;
    &__table {
      display: none;

      @media (min-width: 880px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        min-width: 100%;
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
        min-width: 100%;
      }
    }

    &__selectsContainer {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: 10px;
      width: 100%;

      @media (min-width: 880px) {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        max-width: 100%;
      }
    }

    &__btns-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__name {
      font-size: ${(props) => props.theme.fontsSize.__SM};
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
    &__comments {
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }
    &__location {
      font-size: large;
      color: ${(props) => props.theme.colors.darkRed};
    }

    &__category {
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      font-size: ${(props) => props.theme.fontsSize.__SM};
      text-align: left;
      display: flex;
      justify-content: flex-start;
    }
    &__type {
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }
    &__type-section {
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
      font-size: ${(props) => props.theme.fontsSize.__SM};

      &--accepted {
        color: #8c9b6e;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--rejected {
        color: #c00000;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--cancelled {
        font-size: ${(props) => props.theme.fontsSize.__SM};
        color: #7b3c47;
      }

      &--sent {
        font-size: ${(props) => props.theme.fontsSize.__SM};
        color: #4682b4;
      }

      &--pending-nomade {
        font-size: ${(props) => props.theme.fontsSize.__SM};

        color: #e94e1b;
      }

      &--pending-company {
        font-size: ${(props) => props.theme.fontsSize.__SM};
        color: #ad6975;
      }

      &--done {
        font-size: ${(props) => props.theme.fontsSize.__SM};
        color: green;
      }

      &--finished {
        font-size: ${(props) => props.theme.fontsSize.__SM};
        color: ${(props) => props.theme.colors.purple};
      }

      &--incident {
        font-size: ${(props) => props.theme.fontsSize.__SM};
        color: #e57c00;
      }

      &--published {
        font-size: ${(props) => props.theme.fontsSize.__SM};
        color: #28a745;
      }
      &--modification {
        color: #f8a842;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }
      &--received {
        font-size: ${(props) => props.theme.fontsSize.__SM};
        color: #4682b4;
      }
    }

    &--modification {
      color: #f8a842;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &--received {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      color: #4682b4;
    }

    &--published {
      font-size: ${(props) => props.theme.fontsSize.__SM};
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
      color: white;
      top: 0;
    }

    &__plan {
      &--basic {
        color: #ad6975;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--standard {
        color: #5b8a72;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--premium {
        color: #c29f6d;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--pending {
        color: #e57c00;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }
      &--pause {
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }
    }

    &__start-date {
      color: ${(props) => props.theme.colors.mainColor};
      /* opacity: 0.6; */
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__end-date {
      /* opacity: 0.6; */
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__link-sent {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      color: ${(props) => props.theme.colors.softGreen};
    }

    &__link-pending {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      color: ${(props) => props.theme.colors.red};
    }

    &__date {
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__social-media {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 5px;
    }

    &__status {
      font-size: ${(props) => props.theme.fontsSize.__SM};

      &--active {
        color: #28a745;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--inactive {
        color: #c00000;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--pending {
        color: #e57c00;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--standby {
        color: #ba7e83;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }
    }

    &__plan {
      &--mensual {
        color: #7b3c47;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }

      &--trimestral {
        color: #4682b4;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }
      &--pending {
        color: #e57c00;
        font-size: ${(props) => props.theme.fontsSize.__SM};
      }
    }

    &__role {
      &--admin {
        color: ${(props) => props.theme.colors.mainColor};
      }

      &--manager {
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
    padding-top: 20px;
    &__mensual {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-top: 20px;
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
      height: 40px;
      width: 150px;
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
