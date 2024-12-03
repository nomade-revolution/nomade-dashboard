import styled from "styled-components";

const DashboardStyled = styled.table`
  @media (max-width: 768px) {
    display: none;
  }
  .table {
    &__sort-button {
      color: ${(props) => props.theme.fontsColors.corporativeColor};
      font-weight: 700;
      font-size: ${(props) => props.theme.fontsSize.__SMM};
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      width: 100%;
    }
  }

  .header__section {
    width: 200px;
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
    background: ${(props) => props.theme.colors.mainColor};
    color: ${(props) => props.theme.fontsColors.light};
    font-weight: 700;
    padding: 3px 15px;
    border-radius: ${(props) => props.theme.borderRadius.submitButton};
  }
`;

export default DashboardStyled;
