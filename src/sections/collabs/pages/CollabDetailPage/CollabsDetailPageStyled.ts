import styled from "styled-components";

const MOBILE_BREAKPOINT = "768px";

const CollabsDetailPageStyled = styled.main`
  background: ${(props) => props.theme.colors.backgroundPages};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px;
  color: ${(props) => props.theme.fontsColors.dashBoard};

  @media (min-width: 1000px) and (max-width: 1600px) {
    padding: 40px 90px;
  }

  @media (min-width: 1600px) {
    padding: 40px 50px;
    height: 100%;
  }

  .detail-collab {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    /* Mobile: sub-header transparent, outer space text, full-width, floating over content */
    &__header-bar-mobile {
      display: none;

      @media (max-width: ${MOBILE_BREAKPOINT}) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: transparent;
        color: ${(props) => props.theme.colors.outerSpace};
        padding: 8px 0 12px 0;
        min-height: 44px;
      }
    }

    &__back-wrap-mobile {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: ${(props) => props.theme.colors.outerSpace};

      button,
      .goback-button {
        color: inherit;
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }

    &__title-mobile {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      flex: 1;
      text-align: center;
      color: inherit;
    }

    /* Desktop: hide mobile header bar and go-back above; mobile: hide desktop header + go-back, show header bar */
    &__desktop-top {
      @media (max-width: ${MOBILE_BREAKPOINT}) {
        display: none;
      }
    }

    &__header-bar-mobile + &__content-wrap {
      @media (max-width: ${MOBILE_BREAKPOINT}) {
        padding-top: 4px;
      }
    }

    &__actions--desktop {
      @media (max-width: ${MOBILE_BREAKPOINT}) {
        display: none;
      }
    }

    &__data {
      display: flex;
      flex-direction: column;
      gap: 40px;

      @media (min-width: 1000px) {
        flex-direction: row;
      }
    }

    &__stepper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background: ${(props) => props.theme.colors.lightGrey};
      box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
      padding: 20px 40px;
      border-radius: 10px;
      width: 40%;

      @media (max-width: 1000px) {
        width: 100%;
      }
    }

    &__top-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__actions {
      display: flex;
      gap: 10px;
    }
  }
`;

export default CollabsDetailPageStyled;
