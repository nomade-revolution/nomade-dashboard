import styled from "styled-components";

const CustomDropdownStyled = styled.div`
  .dropdown {
    &__state-section {
      font-weight: bold;

      &--accepted {
        color: ${(props) => props.theme.colors.orange};
      }

      &--crejected {
        color: ${(props) => props.theme.colors.mainColor};
      }

      &--cancelled {
        color: ${(props) => props.theme.colors.purple};
      }

      &--sent {
        color: ${(props) => props.theme.colors.darkRed};
      }
    }
  }
`;

export default CustomDropdownStyled;
