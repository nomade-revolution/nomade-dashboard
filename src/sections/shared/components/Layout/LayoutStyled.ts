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
      display: none;

      @media (min-width: 1000px) {
        padding: 30px 20px;
        box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
        display: block;
        z-index: 1;
        padding: 0;
        width: 20%;
        position: fixed;
      }
    }

    &__header {
      padding: 30px 20px;
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      z-index: 100;
      position: sticky;
      width: 100%;

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

      @media (min-width: 1000px) and (max-width: 1600px) {
        padding-left: 19.5rem;
      }

      @media (min-width: 1600px) {
        padding-left: 370px;
      }
    }

    &__sidebar-hidden {
      padding-left: 0;
      padding-top: 0;
    }
  }
`;

export default LayoutStyled;
