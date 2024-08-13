import styled from "styled-components";

const SearchBarStyled = styled.form`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media (min-width: 1000px) and (max-width: 1600px) {
    width: 52%;
  }

  @media (min-width: 1600px) {
    width: 40%;
  }

  .search {
    &__field {
      border: 1px solid darkgray;
      border-radius: 5px 0 0 5px;
      padding: 0 6px;
      width: 100%;
      height: 55px;

      @media (min-width: 1000px) and (max-width: 1600px) {
        width: 400px;
      }

      @media (min-width: 1600px) {
        width: 500px;
      }
    }

    &__button {
      border: none;
      cursor: pointer;
      padding: 8px;
      color: black;
      display: flex;
      align-items: center;
      gap: 5px;
      border: 1px solid darkgray;
      border-radius: 0 5px 5px 0;
      font-weight: 700;
      height: 55px;
    }

    &__button-text {
      display: none;

      @media (min-width: 600px) {
        display: block;
      }
    }

    &__fieldContainer {
      position: relative;
      width: 100%;

      @media (min-width: 1000px) {
        padding-left: 15px;
        width: fit-content;
      }
    }

    &__closeButton {
      position: absolute;
      top: 30px;
      right: 5px;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`;

export default SearchBarStyled;
