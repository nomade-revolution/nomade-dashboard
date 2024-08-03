import { Tooltip } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import ActionsStyled from "./ActionsStyled";
import useActions from "sections/shared/hooks/useActions/useActions";

interface ActionsProps {
  pageName: string;
  setIsDialogOpen: (value: boolean) => void;
}

const Actions = ({
  pageName,
  setIsDialogOpen,
}: ActionsProps): React.ReactElement => {
  let buttons: React.ReactNode;
  const { handleIsDialogOpen } = useActions();

  // const navigate = useNavigate();

  switch (pageName) {
    case SectionTypes.collabs:
      buttons = (
        <>
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
          <Tooltip title="Borrar collab">
            <button
              aria-label="Borrar collab"
              onClick={() => handleIsDialogOpen(setIsDialogOpen)}
            >
              <RiDeleteBin6Line className={"icon"} color="red" />
            </button>
          </Tooltip>
        </>
      );
      break;
    case SectionTypes.offers:
      buttons = (
        <>
          <Tooltip title="Borrar oferta">
            <button
              aria-label="Borrar oferta"
              onClick={() => handleIsDialogOpen(setIsDialogOpen)}
            >
              <RiDeleteBin6Line className={"icon"} color="red" />
            </button>
          </Tooltip>
        </>
      );
      break;
    case SectionTypes.influencers:
      buttons = (
        <>
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
          <Tooltip title="Borrar influencer">
            <button
              aria-label="Borrar influencer"
              onClick={() => handleIsDialogOpen(setIsDialogOpen)}
            >
              <RiDeleteBin6Line className={"icon"} color="red" />
            </button>
          </Tooltip>
        </>
      );
      break;
    case SectionTypes.customers:
      buttons = (
        <Tooltip title="Borrar cliente">
          <button
            aria-label="Borrar cliente"
            onClick={() => handleIsDialogOpen(setIsDialogOpen)}
          >
            <RiDeleteBin6Line className={"icon"} color="red" />
          </button>
        </Tooltip>
      );
      break;
    case SectionTypes.users:
      buttons = (
        <Tooltip title="Borrar usuario">
          <button
            aria-label="Borrar usuario"
            onClick={() => handleIsDialogOpen(setIsDialogOpen)}
          >
            <RiDeleteBin6Line className={"icon"} color="red" />
          </button>
        </Tooltip>
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
