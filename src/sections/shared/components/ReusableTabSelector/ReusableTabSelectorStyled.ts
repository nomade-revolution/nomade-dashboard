import styled from "styled-components";

const ReusableTabSelectorStyled = styled.section`
  .react-tabs {
    font-weight: 700;
    font-size: ${(props) => props.theme.fontsSize.__SM};
    padding: 0 20px;

    &__tab {
      background-color: transparent;
      color: ${(props) => props.theme.colors.dark};
      cursor: pointer;
      padding: 5px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 5px;
      border: none;
    }

    &__tab--selected {
      background-color: ${(props) => props.theme.colors.mainColor};
      color: white;
      border-bottom: 1px solid black;
      border-radius: 5px;
      border: none;
    }

    &__tab-panel {
      padding: 0px 0;
      border-top: none;
    }

    &__tab-list {
      display: flex;
      gap: 10px;
      border: none;
    }
  }
`;

export default ReusableTabSelectorStyled;
