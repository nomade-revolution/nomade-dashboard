import { Tooltip } from "@mui/material";
import { FaEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import ActionsStyled from "./ActionsStyled";

interface ActionsProps {
  pageName: string;
}

const Actions = ({ pageName }: ActionsProps): React.ReactElement => {
  let buttons: React.ReactNode;

  // const navigate = useNavigate();

  switch (pageName) {
    case SectionTypes.collabs:
      buttons = (
        <>
          <Tooltip title="Borrar colección">
            <button aria-label="Borrar colección">
              <RiDeleteBin6Line className={"icon"} />
            </button>
          </Tooltip>
          <Tooltip title="Consultar colección">
            <Link
              to={``}
              target="_blank"
              aria-label="Consultar colección"
              className="link"
            >
              <FaEye className={"icon"} />
            </Link>
          </Tooltip>
        </>
      );
      break;
    case SectionTypes.offers:
      buttons = (
        <>
          <Tooltip title="Borrar colección">
            <button aria-label="Borrar colección">
              <RiDeleteBin6Line className={"icon"} />
            </button>
          </Tooltip>
        </>
      );
      break;
    case SectionTypes.influencers:
      buttons = (
        <>
          <Tooltip title="Editar producto">
            <button aria-label="Editar">
              <FaEdit className={"icon"} />
            </button>
          </Tooltip>
          {/* <Tooltip title="Deshabilitar producto">
            <button
              aria-label="Deshabilitar producto"
              onClick={() => setIsOpenDialog(true)}
            >
              <VscDebugDisconnect className={"icon"} />
            </button>
          </Tooltip> */}
          <Tooltip title="Ver detalles">
            <Link
              to={``}
              target="_blank"
              aria-label="Ver detalles"
              className="link"
            >
              <FaEye className={"icon"} />
            </Link>
          </Tooltip>
        </>
      );
      break;
    case SectionTypes.customers:
      buttons = (
        <Tooltip title="Añadir a colección">
          <button
            aria-label="Añadir a colección"
            className="icons-container__modalSelectButton"
            type="button"
          >
            <FiPlusCircle className={"icon"} />
            Seleccionar
          </button>
        </Tooltip>
      );
      break;
    case SectionTypes.users:
      buttons = (
        <>
          <Tooltip title="Editar banner">
            <button aria-label="Editar">
              <FaEdit className={"icon"} />
            </button>
          </Tooltip>
          <Tooltip title="Borrar banner">
            <button aria-label="Borrar banner">
              <RiDeleteBin6Line className={"icon"} color="red" />
            </button>
          </Tooltip>
        </>
      );
      break;

    default:
      buttons = null;
  }

  return (
    <ActionsStyled>
      <div
        className={
          pageName === "collection-modal" || pageName === "products-modal"
            ? "icons-containerModal"
            : "icons-container"
        }
      >
        {buttons}
      </div>
    </ActionsStyled>
  );
};

export default Actions;
