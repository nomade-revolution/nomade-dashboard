import styled from "styled-components";

const NotFoundStyled = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  .not-found {
    &__icon {
      font-size: ${(props) => props.theme.fontsSize.notFoundIcon};
    }

    &__error {
      font-weight: 700;
      font-size: ${(props) => props.theme.fontsSize.__XXXL};
    }

    &__message {
      font-weight: 700;
    }

    &__link {
      background: ${(props) => props.theme.colors.mainColor};
      padding: 10px;
      border-radius: ${(props) => props.theme.borderRadius.badges};
      font-weight: 700;
      color: ${(props) => props.theme.fontsColors.light};
    }
  }
`;

export default NotFoundStyled;
