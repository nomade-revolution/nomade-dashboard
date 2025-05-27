import styled from "styled-components";

const DashboardStyled = styled.table`
  min-width: 90%;
  @media (max-width: 768px) {
    display: none;
  }
  .table {
    &__sort-button {
      color: ${(props) => props.theme.fontsColors.corporativeColor};
      font-weight: 700;
      font-size: ${(props) => props.theme.fontsSize.__SMM};
      display: flex;
      align-items: flex-start;
      text-align: left;
      justify-content: flex-start;
      gap: 10px;
      padding: 0;
      width: 100%;
    }
    &__sort-button-center {
      color: ${(props) => props.theme.fontsColors.corporativeColor};
      font-weight: 700;
      font-size: ${(props) => props.theme.fontsSize.__SMM};
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 0;
      width: 100%;
      background-color: pink;
    }
  }

  .header__section {
    width: 200px;
  }
  .header__section--large {
    width: 250px;
  }
  .header__section--small {
    width: 100px;
  }

  .contact__section {
    width: 220px;
  }

  .client__section {
    width: 220px;
  }

  .details__link {
    font-weight: 700;
  }

  .details__link:hover {
    text-decoration: underline;
  }

  .orders {
    background: ${(props) => props.theme.colors.mineralGreen};
    color: ${(props) => props.theme.fontsColors.light};
    font-weight: 700;
    padding: 3px 15px;
    border-radius: ${(props) => props.theme.borderRadius.submitButton};
  }
`;

export default DashboardStyled;
