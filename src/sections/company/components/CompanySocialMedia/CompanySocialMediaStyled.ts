import styled from "styled-components";

const CompanySocialMediaStyled = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 1000px) {
    flex-direction: row;
  }

  .social-media {
    &__data {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  }
`;

export default CompanySocialMediaStyled;
