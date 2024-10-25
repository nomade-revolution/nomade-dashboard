import styled from "styled-components";

const CompanyCollabsStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .dashboard {
    &__published {
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      color: ${(props) => props.theme.colors.softGreen};
    }

    &__not-published {
      color: red;
      font-weight: 700;
    }
  }
`;

export default CompanyCollabsStyled;
