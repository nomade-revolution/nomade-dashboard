import { FaExclamationCircle } from "react-icons/fa";
import LeadLinkMessageStyled from "./LeadLinkMessageStyled";

interface LeadLinkMessageProps {
  text: string;
  onRetry?: () => void;
}

const LeadLinkMessage = ({
  text,
  onRetry,
}: LeadLinkMessageProps): React.ReactElement => {
  return (
    <LeadLinkMessageStyled className="lead-link-message">
      <FaExclamationCircle aria-hidden="true" />
      <p>{text}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          Reintentar
        </button>
      ) : null}
    </LeadLinkMessageStyled>
  );
};

export default LeadLinkMessage;
