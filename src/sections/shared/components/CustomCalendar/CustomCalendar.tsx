import Calendar from "react-calendar";
import CustomCalendarStyled from "./CustomCalendarStyled";
import { TileDisabledFunc } from "react-calendar/src/index.js";
import { TileClassNameFunc } from "react-calendar/dist/cjs/index.js";
import { ClassName } from "react-calendar/src/shared/types.js";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  value: Value;
  onChange: (value: Value) => void;
  selectRange?: boolean;
  tileDisabled?: TileDisabledFunc;
  tileClassName?: TileClassNameFunc | ClassName;
}

const CustomCalendar = ({
  value,
  onChange,
  selectRange,
  tileDisabled,
  tileClassName,
}: Props): React.ReactElement => {
  return (
    <CustomCalendarStyled>
      <Calendar
        onChange={onChange}
        value={value}
        prev2Label={null}
        next2Label={null}
        selectRange={selectRange}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
      />
    </CustomCalendarStyled>
  );
};

export default CustomCalendar;
