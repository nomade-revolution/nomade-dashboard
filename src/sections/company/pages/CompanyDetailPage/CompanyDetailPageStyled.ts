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
    &__title {
      border-bottom: 2px solid ${(props) => props.theme.colors.mainColor};
      padding-bottom: 10px;
      width: 20%;
    }

    &__info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      background-color: ${(props) => props.theme.colors.lightGrey};
      padding-top: 20px;
      border-radius: 10px;

      @media (min-width: 1000px) {
        display: block;
        position: relative;
        box-shadow: none;
        background-color: none;
        padding-top: 100px;
      }
    }

    &__avatar {
      border-radius: 50%;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);

      @media (min-width: 1000px) {
        position: absolute;
        left: -50px;
        bottom: 100px;
      }
    }
  }
`;

export default CompanyDetailPageStyled;
