import styled from "styled-components";

const OffersButtonStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.light};
  padding: 10px;
  border-radius: 5px;
  font-weight: 700;
  height: 40px;

  &:hover {
    color: ${(props) => props.theme.colors.darkBlue};
    background: transparent;
    border: 2px solid ${(props) => props.theme.colors.darkBlue};
  }
`;

export default OffersButtonStyled;
