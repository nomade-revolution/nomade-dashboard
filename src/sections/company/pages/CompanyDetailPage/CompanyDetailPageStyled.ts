import styled from "styled-components";

const CompanyDetailPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  height: 100vh;

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 200px 150px;
  }

  @media (min-width: 1600px) {
    padding: 70px 200px;
  }

  .company-detail {
    &__info {
      position: relative;
    }

    &__avatar {
      border-radius: 50%;
      position: absolute;
      bottom: 100px;
      left: -50px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
    }
  }
`;

export default CompanyDetailPageStyled;
