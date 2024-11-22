import styled from "styled-components";

const ExportFileButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  color: ${(props) => props.theme.colors.light};
  padding: 7px;
  border-radius: 5px;
  text-transform: capitalize;
  width: fit-content;
  font-weight: 700;

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

  &.export__button--order {
    background: ${(props) => props.theme.colors.blue};
  }

  &.export__button--backorder:hover,
  &.export__button--preorder:hover,
  &.export__button--order:hover {
    background: ${(props) => props.theme.colors.red};
  }
`;

export default ExportFileButtonStyled;
