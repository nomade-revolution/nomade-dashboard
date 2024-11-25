import styled from "styled-components";

const CustomCalendarStyled = styled.section`
  z-index: 10;
  position: relative;

  .react-calendar {
    background-color: none;
    border: none;
    color: ${(props) => props.theme.colors.black};
  }

  .react-calendar__month-view__weekdays {
    display: flex;
    justify-content: space-between;
    border: none;
  }

  .react-calendar__month-view__days {
    border-radius: 20px;
  }

  .react-calendar__month-view {
    border-radius: 20px;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.mainColor};
    font-size: ${(props) => props.theme.fontsSize.__SSM};
    flex-grow: 1;
    text-align: center;
    padding: 10px;
    border: none;
    text-transform: uppercase;
    font-weight: 700;
  }

  .react-calendar__month-view__weekdays__weekday abbr[title] {
    text-decoration: none;
    font-size: ${(props) => props.theme.fontsSize.__SM};
  }

  .react-calendar__month-view__weekdays__weekday:nth-child(6),
  .react-calendar__month-view__weekdays__weekday:nth-child(7) {
    color: ${(props) => props.theme.colors.light};
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.colors.mainColor};
    padding: 10px;
  }

  .react-calendar__navigation__label {
    font-size: ${(props) => props.theme.fontsSize.__SSM};
    color: ${(props) => props.theme.colors.light};
    font-weight: bold;
    text-align: center;
    flex-grow: 1;
    text-transform: uppercase;
  }

  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontsSize.__L};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    border-radius: 10px;
    height: 30px;
    width: 30px;
  }

  .react-calendar__navigation__prev-button::before,
  .react-calendar__navigation__next-button::before {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.fontsSize.__L};
    line-height: 1;
  }

  .react-calendar__tile {
    padding: 5px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.fontsSize.__SSM};
    color: ${(props) => props.theme.colors.black};
  }

  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.colors.mainColor};
    color: ${(props) => props.theme.colors.light};
    border-radius: 10px;
  }

  .react-calendar__tile--range {
    background-color: ${(props) => props.theme.colors.rangeColor};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    background-color: ${(props) => props.theme.colors.grey};
    opacity: 0.6;
  }
`;

export default CustomCalendarStyled;
