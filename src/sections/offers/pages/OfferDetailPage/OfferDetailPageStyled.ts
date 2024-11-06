import styled from "styled-components";

const OfferDetailPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-self: center;
  justify-content: center;
  height: 100%;
  padding: 50px;

  .images-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    overflow: scroll;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .adress-list {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }

  .offer-detail {
    &__section {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      width: 100%;

      @media (min-width: 1000px) {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__participants {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: ${(props) => props.theme.colors.lightGrey};
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      padding: 20px 40px;
      border-radius: 10px;
    }

    &__title {
      font-size: ${(props) => props.theme.fontsSize.__XXL};
      border-bottom: 2px solid ${(props) => props.theme.colors.mainColor};
      padding-bottom: 10px;
      width: 100%;

      @media (min-width: 1000px) and (max-width: 1600px) {
        width: 30%;
      }

      @media (min-width: 1600px) {
        width: 25%;
      }
    }

    &__participant {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__avatar {
      border-radius: 50%;
      object-fit: cover;
    }

    &__name {
      font-weight: 700;
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
      min-width: 90vh;
    }

    &__offer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    &__offer-data {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 30px;
      padding-top: 20px;
      padding-bottom: 20px;
    }

    &__data-section {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      width: 100%;

      @media (min-width: 1000px) {
        width: 40%;
      }
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
      align-items: center;
      gap: 5px;
      font-size: ${(props) => props.theme.fontsSize.__SMM};
    }

    &__text {
      font-size: ${(props) => props.theme.fontsSize.__SMM};
    }

    &__heading {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;

      @media (min-width: 1000px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    &__edit-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      background: ${(props) => props.theme.colors.darkBlue};
      color: ${(props) => props.theme.colors.light};
      padding: 10px;
      border-radius: 5px;
      font-weight: 700;
    }
  }
`;

export default OfferDetailPageStyled;
