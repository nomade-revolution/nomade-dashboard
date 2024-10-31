import styled from "styled-components";

const OffersPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    &__table {
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
    }

    &__title {
      padding-right: 20px;
    }

    &__image {
      object-fit: cover;
    }

    &__time {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    &__time-list {
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: center;
      font-size: ${(props) => props.theme.fontsSize.__SSM};
    }

    &__time-listItem {
      background: ${(props) => props.theme.colors.darkRed};
      padding: 1px;
      width: 15px;
      height: 15px;
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
    }

    &__reservations {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      background: ${(props) => props.theme.colors.mainColor};
      width: fit-content;
      padding: 5px;
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      border-radius: ${(props) => props.theme.borderRadius.badges};
    }

    &__state-active,
    &__state-inactive {
      font-size: large;
    }

    &__state-active {
      color: ${(props) => props.theme.fontsColors.corporativeColor};
    }

    &__state-inactive {
      color: ${(props) => props.theme.fontsColors.lightGrey};
    }
  }

  .dashboard {
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
  }
`;

export default OffersPageStyled;
