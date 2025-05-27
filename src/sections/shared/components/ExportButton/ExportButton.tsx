import { PiMicrosoftExcelLogo } from "react-icons/pi";
import ExportFileButtonStyled from "./ExportFileButtonStyled";

interface ExportFileButtonProps {
  action: () => void;
  text?: string;
}

const ExportFilesButton = ({ action, text }: ExportFileButtonProps) => {
  return (
    <ExportFileButtonStyled
      className={"export__button--backorder"}
      onClick={() => action()}
    >
      {`${text}`} <PiMicrosoftExcelLogo className={"export__button--icon"} />
    </ExportFileButtonStyled>
  );
};

export default ExportFilesButton;
