import styled from "styled-components";

export const AssignExistingCompanyModalStyled = styled.div`
  padding: 20px;
  min-width: 320px;

  /* Confirmación: mismo ancho compacto que patrón EditUser / modal de confirmación */
  &.assign-modal--confirm {
    max-width: 520px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .assign-modal {
    &__title {
      color: ${(props) => props.theme.colors.mainColor};
      margin-bottom: 16px;
      font-size: ${(props) => props.theme.fontsSize.__ML};
    }

    &__search-row {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
      align-items: center;
    }

    &__input {
      flex: 1;
      height: ${(props) => props.theme.heights.inputs};
      padding: 0 12px;
      font-size: ${(props) => props.theme.fontsSize.__SM};
      border-radius: ${(props) => props.theme.borderRadius.inputs};
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      outline: none;
      transition:
        border-color 0.2s,
        box-shadow 0.2s;

      &:focus {
        border-color: ${(props) => props.theme.colors.mainColor};
        box-shadow: 0 0 0 2px ${(props) => props.theme.colors.softMainColor};
      }

      &::placeholder {
        color: ${(props) => props.theme.fontsColors.lightGrey};
      }
    }

    &__search-btn {
      height: ${(props) => props.theme.heights.inputs};
      padding: 0 20px;
      font-weight: ${(props) => props.theme.fontWeights.mediumBold};
      background: ${(props) => props.theme.colors.darkBlue};
      color: ${(props) => props.theme.fontsColors.light};
      border: none;
      border-radius: ${(props) => props.theme.borderRadius.badges};
      cursor: pointer;
      white-space: nowrap;

      &:hover:not(:disabled) {
        background: transparent;
        color: ${(props) => props.theme.colors.darkBlue};
        border: 2px solid ${(props) => props.theme.colors.darkBlue};
      }

      &:focus {
        outline: none;
        border-color: ${(props) => props.theme.colors.darkBlue};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 280px;
      overflow-y: auto;
      border: 1px solid ${(props) => props.theme.borders.lightGrey};
      border-radius: ${(props) => props.theme.borderRadius.inputs};
    }

    &__list-item {
      padding: 12px 14px;
      border-bottom: 1px solid ${(props) => props.theme.borders.lightGrey};
      cursor: pointer;
      transition: background 0.15s;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: ${(props) => props.theme.colors.lightGrey};
      }

      &:focus {
        outline: none;
        background: ${(props) => props.theme.colors.softMainColor};
      }
    }

    &__empty {
      color: ${(props) => props.theme.fontsColors.lightGrey};
      margin-top: 12px;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__confirm-text {
      margin-bottom: 20px;
      line-height: 1.6;
      font-size: ${(props) => props.theme.fontsSize.__SM};
      color: ${(props) => props.theme.fontsColors.dashBoard};
    }

    &__confirm-user {
      margin: 12px 0;
      padding: 12px;
      background: ${(props) => props.theme.colors.lightGrey};
      border-radius: ${(props) => props.theme.borderRadius.badges};
      font-weight: ${(props) => props.theme.fontWeights.mediumBold};
    }

    &__confirm-user-email {
      font-size: ${(props) => props.theme.fontsSize.__SSM};
      margin-top: 4px;
    }

    &__confirm-list {
      margin: 12px 0 20px;
      padding-left: 20px;
      line-height: 1.8;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    /* Contenedor de botones centrado; orden: Confirmar (izq), Cancelar (der), gap 10px */
    &__actions {
      display: flex;
      gap: 10px;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding-top: 20px;
    }

    /* Mismo estilo que Cancelar en EditUser (login-form__error): rojo, padding/width/radius idénticos */
    &__btn-cancel {
      font-weight: 700;
      padding: 10px 20px;
      width: 200px;
      border-radius: 5px;
      background: ${(props) => props.theme.colors.red};
      color: ${(props) => props.theme.fontsColors.light};
      border: none;
      cursor: pointer;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    /* Mismo estilo que Guardar en EditUser (login-form__submit) pero color Outer Space: verde primary */
    &__btn-confirm {
      font-weight: 700;
      padding: 10px 20px;
      width: 200px;
      border-radius: 5px;
      background: ${(props) => props.theme.colors.outerSpace};
      color: ${(props) => props.theme.fontsColors.light};
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
`;
