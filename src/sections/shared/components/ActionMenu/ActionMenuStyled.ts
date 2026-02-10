import styled from "styled-components";

const MOBILE_BREAKPOINT = "768px";

export const ActionMenuStyled = styled.div<{ $align: "left" | "right" }>`
  position: relative;
  display: inline-flex;
  justify-content: ${(p) => (p.$align === "right" ? "flex-end" : "flex-start")};

  .action-menu {
    &__trigger {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      width: 44px;
      height: 44px;
      border: none;
      background: transparent;
      color: inherit;
      font-size: 1.25rem;
      cursor: pointer;
      border-radius: 8px;

      &:hover,
      &:focus-visible {
        background: rgba(36, 60, 52, 0.08);
      }
    }

    &__backdrop {
      display: none;

      @media (max-width: ${MOBILE_BREAKPOINT}) {
        display: block;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        z-index: 199;
      }
    }

    &__overlay-desktop {
      display: none;

      @media (min-width: ${MOBILE_BREAKPOINT}) {
        display: block;
        position: fixed;
        inset: 0;
        background: transparent;
        z-index: 198;
      }
    }

    &__dropdown {
      position: absolute;
      top: calc(100% + 8px);
      ${(p) => (p.$align === "right" ? "right: 0;" : "left: 0;")}
      min-width: 200px;
      max-width: min(320px, calc(100vw - 24px));
      background: ${(props) => props.theme.colors.light};
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      z-index: 200;
      overflow: hidden;
      max-height: 70vh;
      overflow-y: auto;

      @media (max-width: ${MOBILE_BREAKPOINT}) {
        display: none;
      }
    }

    &__bottom-sheet {
      display: none;

      @media (max-width: ${MOBILE_BREAKPOINT}) {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        max-width: 100vw;
        box-sizing: border-box;
        background: ${(props) => props.theme.colors.light};
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
        border-radius: 16px 16px 0 0;
        z-index: 200;
        max-height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
      }
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 14px 20px;
      border: none;
      background: none;
      font-size: 1rem;
      text-align: left;
      cursor: pointer;
      color: ${(props) => props.theme.fontsColors.dashBoard};

      &:not(:last-child) {
        border-bottom: 1px solid ${(props) => props.theme.borders.lightGrey};
      }

      &:hover:not(:disabled),
      &:focus-visible:not(:disabled) {
        background: ${(props) => props.theme.colors.lightGrey};
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &--destructive {
        color: ${(props) => props.theme.colors.red};
        font-weight: 600;
      }
    }
  }
`;

export default ActionMenuStyled;
