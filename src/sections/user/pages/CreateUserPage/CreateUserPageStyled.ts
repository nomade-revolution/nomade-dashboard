import styled from "styled-components";

const CreateUserPageStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: #f2f2f2;
  padding-top: 40px;
  gap: 30px;

  @media (min-width: 800px) {
    align-items: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 559px;
    padding-bottom: 20px;
  }
`;

export default CreateUserPageStyled;
