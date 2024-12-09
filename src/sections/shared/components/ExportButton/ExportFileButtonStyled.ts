import styled from "styled-components";

const ExportFileButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  color: ${(props) => props.theme.colors.light};
  padding: 5px;
  border-radius: 7px;
  font-weight: 700;
  padding: 10px 20px;
  width: 150px;
  height: 40px;

  &:active {
    background: var(--darkRed);
    font-weight: 700;
    color: ${(props) => props.theme.colors.black};
  }
  &.export__button--backorder {
    background: ${(props) => props.theme.colors.black};
  }

  &.export__button--preorder {
    background: ${(props) => props.theme.colors.orange};
  }

  &.export__button--backorder:hover {
    background: ${(props) => props.theme.colors.light};
    color: ${(props) => props.theme.colors.black};
    border: 2px solid ${(props) => props.theme.colors.black};
  }
`;

export default ExportFileButtonStyled;
