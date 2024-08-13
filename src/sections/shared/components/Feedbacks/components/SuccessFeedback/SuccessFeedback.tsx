import { FaCheck } from "react-icons/fa";
import SuccessFeedbackStyled from "./SuccessFeedbackStyled";

interface SuccessFeedbackProps {
  text: string;
}

const SuccessFeedback = ({
  text,
}: SuccessFeedbackProps): React.ReactElement => {
  return (
    <SuccessFeedbackStyled className="feedback__success">
      <span>{text}</span>
      <FaCheck />
    </SuccessFeedbackStyled>
  );
};

export default SuccessFeedback;
