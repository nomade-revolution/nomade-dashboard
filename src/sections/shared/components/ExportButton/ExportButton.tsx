import { SiMicrosoftexcel } from "react-icons/si";
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
      {`${text}`} <SiMicrosoftexcel className={"export__button--icon"} />
    </ExportFileButtonStyled>
  );
};

export default ExportFilesButton;
