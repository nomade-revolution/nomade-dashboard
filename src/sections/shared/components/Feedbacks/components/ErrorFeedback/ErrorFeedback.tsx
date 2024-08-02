import { FaMinusCircle } from "react-icons/fa";
import ErrorFeedbackStyled from "./ErrorFeedbackStyled";

interface SuccessFeedbackProps {
  text: string;
}

const ErrorFeedback = ({ text }: SuccessFeedbackProps): React.ReactElement => {
  return (
    <ErrorFeedbackStyled className="feedback__error">
      <span>{text}</span>
      <FaMinusCircle />
    </ErrorFeedbackStyled>
  );
};

export default ErrorFeedback;
