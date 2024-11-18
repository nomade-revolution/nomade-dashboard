import styled from "styled-components";

export const DefaultCollabableSectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .default-section {
    &__text-bold {
      font-weight: 700;
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__timeslot {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    &__time-btns {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__time-btn {
      background: ${(props) => props.theme.colors.mainColor};
      color: ${(props) => props.theme.colors.light};
      padding: 2px 10px;
      border-radius: 10px;
      transition: background-color 0.3s ease;

      :hover {
        background-color: #e0e0e0;
      }
    }

    &__days-hours {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .selected {
    background-color: ${(props) => props.theme.colors.light};
    border: 2px solid ${(props) => props.theme.colors.mainColor};
    color: ${(props) => props.theme.colors.mainColor};
  }
`;
