import styled from "styled-components";

const CreateInfluencerPageStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
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

export default CreateInfluencerPageStyled;
