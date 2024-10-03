import { useNavigate } from "react-router-dom";
import NoDataHandlerStyled from "./NoDataHandlerStyled";
import { IoChevronBackCircleSharp } from "react-icons/io5";

interface NoDataProps {
  pageName: string;
  search: string | number;
}

const NoDataHandler = ({
  // pageName,
  search,
}: NoDataProps): React.ReactElement => {
  const navigate = useNavigate();

  const handleNotFoundButton = () => {
    navigate(-1);
  };

  return (
    <NoDataHandlerStyled className="no-data">
      <span className="no-data__text">No se han encontrado resultados</span>
      {search && (
        <button onClick={handleNotFoundButton} className="no-data__button">
          <IoChevronBackCircleSharp className="no-data__button-icon" /> Volver
          atrás
        </button>
      )}
    </NoDataHandlerStyled>
  );
};

export default NoDataHandler;
