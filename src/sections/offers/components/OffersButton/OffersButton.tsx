import { FaEdit } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import OffersButtonStyled from "./OffersButtonStyled";

interface Props {
  type: string;
  text: string;
  onClick: () => void;
}

const OffersButton = ({ onClick, text, type }: Props): React.ReactElement => {
  return (
    <OffersButtonStyled onClick={onClick} className="offer-btn">
      {type === "edit" ? <FaEdit /> : <MdAddToPhotos />}
      {text}
    </OffersButtonStyled>
  );
};

export default OffersButton;
