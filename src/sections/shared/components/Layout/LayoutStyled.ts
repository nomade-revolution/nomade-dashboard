import styled from "styled-components";

interface Props {
  $isMinimized: boolean;
}

const LayoutStyled = styled.div<Props>`
  width: 100%;
  position: relative;

  .layout {
    display: flex;
    flex-direction: column;

    &__sidebar {
      display: none;

      @media (min-width: 1000px) {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: ${(props) => (props.$isMinimized ? "5rem" : "17.5rem")};
        background: ${(props) => props.theme.colors.sidebarBg};
        z-index: 1;
      }
    }

    &__header {
      width: 100%;
      position: sticky;
      top: 0;
      background: ${(props) => `${props.theme.colors.softMainColor}`};
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      z-index: 100;
      padding: 30px 20px;

      @media (min-width: 1000px) {
        display: none;
      }
    }

    &__pages {
      flex-grow: 1;
      overflow-y: auto;
      padding: 30px;
      margin-left: ${(props) => (props.$isMinimized ? "2rem" : "15rem")};

      @media (max-width: 999px) {
        margin-left: 0;
        padding-left: 0;
      }
    }
  }
`;

export default LayoutStyled;
