import { styled } from "styled-components";

const MyAccountPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 40px 40px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  height: 100%;
  max-width: 100%;

  @media (min-width: 800px) {
    padding: 90px 50px;
  }

  .section {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  .data-section {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  .data-title {
    width: 100px;
    font-weight: bold;
    padding: 5;
  }
  .data {
    width: 200px;
    padding: 5;
  }
`;

export default MyAccountPageStyled;
