import styled from "styled-components";

interface Props {
  $color: string;
}

const ActionButtonStyled = styled.button<Props>`
  background: ${(props) => props.$color};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.colors.light};
  font-weight: 700;
  height: 40px;
  border-radius: 7px;

  &:hover {
    color: ${(props) => props.$color};
    background: transparent;
    border: 2px solid ${(props) => props.$color};
  }
`;

export default ActionButtonStyled;
