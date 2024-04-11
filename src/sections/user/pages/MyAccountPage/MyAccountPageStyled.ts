import { styled } from "styled-components";

const MyAccountPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};
  height: 100%;

  @media (min-width: 800px) {
    padding: 90px 30px;
  }
`;

export default MyAccountPageStyled;
