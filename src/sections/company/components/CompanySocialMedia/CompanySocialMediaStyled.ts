import styled from "styled-components";

const CompanySocialMediaStyled = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-right: 20px;
  .social-media {
    &__data {
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }

    &__link {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
  }
`;

export default CompanySocialMediaStyled;
