import styled from "styled-components";

const NoDataHandlerStyled = styled.div`
  height: 100%;
  width: 100%;
  padding: 90px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  .no-data {
    &__text {
      font-size: ${(props) => props.theme.fontsSize.__L};
      font-weight: 700;
    }

    &__button {
      background: black;
      color: white;
      font-weight: 700;
      height: 40px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
    }

    &__button-icon {
      font-size: 20px;
    }
  }
`;

export default NoDataHandlerStyled;
