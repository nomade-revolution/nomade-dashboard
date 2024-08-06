import styled from "styled-components";

const CompanyDetailDataStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  letter-spacing: 0.6px;
  padding: 20px 120px;
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);

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
      align-items: center;
      gap: 5px;
      font-weight: bold;
    }

    &__country {
      font-weight: bold;
    }
  }
`;

export default CompanyDetailDataStyled;
