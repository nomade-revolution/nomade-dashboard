import Calendar from "react-calendar";
import CustomCalendarStyled from "./CustomCalendarStyled";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  value: Value;
  onChange: (value: Value) => void;
}

const CustomCalendar = ({ value, onChange }: Props): React.ReactElement => {
  return (
    <CustomCalendarStyled>
      <Calendar
        onChange={onChange}
        value={value}
        prev2Label={null}
        next2Label={null}
      />
    </CustomCalendarStyled>
  );
};

export default CustomCalendar;
