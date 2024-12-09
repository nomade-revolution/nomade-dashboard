import styled from "styled-components";

const CompanyDetailPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  height: 100%;

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 20px 80px;
  }

  @media (min-width: 1600px) {
    padding: 70px 120px;
    padding-bottom: 40px;
  }

  .company-detail {
    &__header {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__title {
      border-bottom: 2px solid ${(props) => props.theme.colors.mainColor};
      padding-bottom: 10px;
      width: 20%;
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      background-color: ${(props) => props.theme.colors.lightGrey};
      /* padding-top: 20px; */
      border-radius: 10px;

      @media (min-width: 1000px) {
        display: block;
        position: relative;
        box-shadow: none;
        background-color: none;
        /* padding-top: 100px; */
      }
    }

    &__avatar {
      border-radius: 50%;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);

      @media (min-width: 1000px) {
        position: absolute;
        left: -50px;
        top: -20px;
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    &__create,
    &__plan-modify {
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

    &__plan-modify {
      background: ${(props) => props.theme.colors.mainColor};
    }
  }

  .dashboard {
    &__state-section {
      font-weight: bold;

      &--accepted {
        font-weight: bold;
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

      &--pending-nomade {
        font-weight: bold;
        color: blue;
      }

      &--pending-company {
        font-weight: bold;
        color: fuchsia;
      }

      &--done {
        color: green;
      }

      &--finished {
        color: ${(props) => props.theme.colors.purple};
      }

      &--incident {
        color: brown;
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

export default CompanyDetailPageStyled;
