import styled from "styled-components";

const LeadLinkMessageStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  text-align: center;
  color: ${(props) => props.theme.fontsColors.dashBoard};

  svg {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    color: ${(props) => props.theme.colors.mineralGreen};
  }

  p {
    margin: 0;
    font-size: ${(props) => props.theme.fontsSize.__M};
    line-height: 1.5;
  }

  button {
    margin-top: 8px;
    min-height: 44px;
    padding: 10px 24px;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius.submitButton};
    background: ${(props) => props.theme.colors.mineralGreen};
    color: ${(props) => props.theme.fontsColors.light};
    font-family: ${(props) => props.theme.fonts.primaryFont};
    font-size: ${(props) => props.theme.fontsSize.__SM};
    cursor: pointer;
  }

  @media (max-width: 600px) {
    gap: 12px;

    p {
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }
  }
`;

export default LeadLinkMessageStyled;
