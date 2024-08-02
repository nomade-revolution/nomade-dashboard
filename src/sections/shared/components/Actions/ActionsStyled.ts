import styled from "styled-components";

const ActionsStyled = styled.div`
  .icons-container {
    &__modalSelectButton,
    &__modalDeselectButton,
    &__modalAddButton {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      color: ${(props) => props.theme.fontsColors.light};
      padding: 10px;
      font-weight: 700;
      border-radius: ${(props) => props.theme.borderRadius.badges};
      width: 120px;
    }

    &__modalSelectButton {
      background: ${(props) => props.theme.colors.black};
    }

    &__modalDeselectButton {
      background: ${(props) => props.theme.colors.red};
    }

    &__modalAddButton {
      background: ${(props) => props.theme.colors.black};
      width: 160px;
    }
  }

  .icons-containerModal {
    padding-left: 50px;
  }

  .link {
    padding: 0 5px;
  }

  .icon {
    font-size: large;
  }
`;

export default ActionsStyled;
