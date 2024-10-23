import { FaRegTrashCan } from "react-icons/fa6";
import DeleteButtonStyled from "./DeleteButtonStyled";

interface Props {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: Props): React.ReactElement => {
  return (
    <DeleteButtonStyled className="delete-button" onClick={onClick}>
      <FaRegTrashCan />
      Borrar
    </DeleteButtonStyled>
  );
};

export default DeleteButton;
