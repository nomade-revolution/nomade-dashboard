import styled from "styled-components";

const TypeAheadStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 350px;
  height: 40px;

  .input {
    width: 280px;
    height: 40px;
  }
  .loaderContainer {
    width: 40px;
    height: 30px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default TypeAheadStyled;
