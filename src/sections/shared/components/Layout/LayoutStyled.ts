import styled from "styled-components";

interface Props {
  $isMinimized: boolean;
}

const LayoutStyled = styled.div<Props>`
  width: 100%;

  .layout {
    display: flex;
    flex-direction: column;

    @media (min-width: 1000px) {
      flex-direction: row;
      width: 100%;
    }

    &__sidebar {
      display: none;

      @media (min-width: 1000px) {
        padding: 30px 20px;
        display: block;
        padding: 0;
        width: ${(props) => (props.$isMinimized ? "fit-content" : "15%")};
        position: fixed;
        z-index: 2;
      }
    }

    &__header {
      padding: 30px 20px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      z-index: 100;
      position: sticky;
      width: 100%;
      background: ${(props) => `${props.theme.colors.mainColor}60`};

      @media (min-width: 1000px) {
        display: none;
        position: sticky;
      }
    }

    &__sidebar-hidden {
      padding-left: 0;
      padding-top: 0;
    }

    &__pages {
      width: 100%;
      overflow-y: auto;
      z-index: 1;

      @media (min-width: 1000px) and (max-width: 1600px) {
        padding-left: ${(props) => (props.$isMinimized ? "5rem" : "16rem")};
      }

      @media (min-width: 1600px) {
        padding-left: ${(props) => (props.$isMinimized ? "5rem" : "17.5rem")};
      }
    }

    &__sidebar-hidden {
      padding-left: 0;
      padding-top: 0;
    }
  }
`;

export default LayoutStyled;
