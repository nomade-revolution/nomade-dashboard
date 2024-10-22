import styled from "styled-components";

const DeleteButtonStyled = styled.button`
  background: ${(props) => props.theme.colors.red};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.colors.light};
  font-weight: 700;
  border-radius: 7px;

  &:hover {
    color: ${(props) => props.theme.colors.red};
    background: transparent;
    border: 2px solid ${(props) => props.theme.colors.red};
  }
`;

export default DeleteButtonStyled;
