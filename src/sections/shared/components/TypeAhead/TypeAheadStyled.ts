import styled from "styled-components";

const TypeAheadStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;

  .input {
    width: 150px;
    margin-bottom: 15px;
  }

  .loaderContainer {
    width: 40px;
    height: 30px;
    margin-left: 60px;
    padding-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default TypeAheadStyled;
