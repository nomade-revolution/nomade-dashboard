import styled from "styled-components";

const CollabsDetailStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 20px;

  @media (max-width: 1000px) {
    width: 100%;
  }

  .collab-detail {
    &__participants {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: ${(props) => props.theme.colors.lightGrey};
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      padding: 20px 40px;
      border-radius: 10px;

      @media (max-width: 1000px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
      }
    }

    &__participant {
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
    }

    &__avatar {
      border-radius: 50%;
      object-fit: cover;
    }

    &__name {
      font-weight: 700;
    }

    &__social,
    &__offer-data {
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__link {
      background: ${(props) => props.theme.colors.mainColor};
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      padding: 5px;
      border-radius: 8px;
      color: ${(props) => props.theme.colors.light};
      font-size: ${(props) => props.theme.fontsSize.__SM};
      font-weight: 700;
      width: 100%;
    }

    &__icon {
      padding-top: 40px;
      font-size: 200px;
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__data {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 40px;
      background: ${(props) => props.theme.colors.lightGrey};
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      padding: 20px 40px;
      border-radius: 10px;
    }

    &__offer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      @media (max-width: 1000px) {
        gap: 20px;
      }
    }

    &__collab-data {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-top: 20px;

      @media (max-width: 1000px) {
        width: 100%;
        flex-direction: column;
        gap: 20px;
        align-items: center;
      }
    }

    &__data-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__data-title {
      font-weight: 700;
    }

    &__type-section {
      font-weight: bold;
      font-size: large;

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

    &__offer-img {
      border-radius: 10px;
      object-fit: cover;
    }

    &__address {
      display: flex;
      gap: 5px;
    }

    &__offer-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__conditions {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__company {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default CollabsDetailStyled;
