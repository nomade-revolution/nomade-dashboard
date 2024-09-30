import styled from "styled-components";

const CollabsReservationsPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
  padding-top: 20px;

  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    padding-left: 70px;
  }

  .title {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding-left: 75px;

    &--text {
      color: ${(props) => props.theme.colors.mainColor};
      font-weight: 700;
    }
  }

  .list-mobile {
    display: flex;

    @media (min-width: 768px) {
      display: none;
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

export default CollabsReservationsPageStyled;
