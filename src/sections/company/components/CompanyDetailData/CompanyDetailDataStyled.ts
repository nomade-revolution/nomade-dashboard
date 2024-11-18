import styled from "styled-components";

const CompanyDetailDataStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  letter-spacing: 0.6px;
  padding: 20px 120px;
  border-radius: 10px;

  @media (min-width: 1000px) {
    box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.lightGrey};
  }

  .company-data {
    &__mainData {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    &__data {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__names {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
      font-weight: bold;
    }

    &__company {
      font-weight: 400;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__country {
      font-weight: bold;
    }

    &__contacts {
      display: flex;
      flex-direction: column;
      gap: 40px;

      @media (min-width: 1400px) {
        flex-direction: unset;
        flex-wrap: wrap;
      }
    }

    &__section-icon {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    &__title {
      color: ${(props) => props.theme.colors.mainColor};
    }
  }

  .contact {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;

    @media (min-width: 1400px) {
      width: 30%;
    }

    &__name {
      font-weight: 700;
    }

    &__type {
      font-weight: 600;
      color: darkblue;
    }
  }

  .plan {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__data {
      display: flex;
      flex-direction: column;
      gap: 20px;

      @media (min-width: 1000px) {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }
    }

    &__section {
      display: flex;
      gap: 10px;
      flex-direction: column;
    }

    &__mensual {
      font-weight: 700;
      color: chocolate;
    }

    &__trimestral {
      font-weight: 700;
      color: darkorange;
    }

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

    &__date {
      color: ${(props) => props.theme.colors.mainColor};
      font-weight: 700;
    }
  }
`;

export default CompanyDetailDataStyled;
