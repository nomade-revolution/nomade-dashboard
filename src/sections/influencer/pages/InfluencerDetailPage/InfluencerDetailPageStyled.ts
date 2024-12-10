import styled from "styled-components";

const InfluencerDetailPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  height: auto;
  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 50px 40px;
  }

  @media (min-width: 1600px) {
    padding: 70px 70px;
  }

  .influencer-detail {
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
      gap: 20px;
      background-color: ${(props) => props.theme.colors.lightGrey};
      border-radius: 10px;
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

export default InfluencerDetailPageStyled;
