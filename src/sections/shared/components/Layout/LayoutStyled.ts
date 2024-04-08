import styled from "styled-components";

const LayoutStyled = styled.div`
  width: 100%;

  .layout {
    display: flex;
    flex-direction: column;

    @media (min-width: 1000px) {
      flex-direction: row;
      width: 100%;
    }

    &__sidebar {
      padding: 30px 20px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      z-index: 1;
      display: none;

      @media (min-width: 1000px) {
        display: block;
        z-index: 1;
        padding: 0;
        width: 20%;
      }
    }

    &__header {
      padding: 30px 20px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      z-index: 1;

      @media (min-width: 1000px) {
        display: none;
      }
    }

    &__sidebar-hidden {
      display: none;
    }

    &__pages {
      width: 100%;
    }
  }
`;

export default LayoutStyled;
