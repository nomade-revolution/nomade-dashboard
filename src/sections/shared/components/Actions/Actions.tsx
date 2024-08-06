import { Tooltip } from "@mui/material";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import ActionsStyled from "./ActionsStyled";
import useActions from "sections/shared/hooks/useActions/useActions";
import { Offer } from "modules/offers/domain/Offer";
import { FullCollab } from "modules/collabs/domain/Collabs";
import { Company, User } from "modules/user/domain/User";
import { Customer } from "modules/customers/domain/Customers";
import { Influencer } from "@influencer";
import { MdVerifiedUser } from "react-icons/md";
import { BsFillXSquareFill } from "react-icons/bs";

interface ActionsProps {
  pageName: string;
  setIsDialogOpen: (value: boolean) => void;
  section: object | Customer | Offer | FullCollab | User | Company;
}

const Actions = ({
  pageName,
  setIsDialogOpen,
  section,
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
          <>
            <Tooltip title="Aceptar">
              <button
                aria-label="Aceptar"
                onClick={() => handleIsDialogOpen(setIsDialogOpen)}
              >
                <FaCheckCircle color="green" className="icon" />
              </button>
            </Tooltip>
            <Tooltip title="Rechazar">
              <button
                aria-label="Rechazar"
                onClick={() => handleIsDialogOpen(setIsDialogOpen)}
              >
                <BsFillXSquareFill className="icon" color="#C64B56" />
              </button>
            </Tooltip>
          </>
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
              to={`/influencer/${(section as Influencer)?.id}`}
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
        <>
          <Tooltip title="Ver detalles">
            <Link
              to={`/cliente/${(section as Company)?.id}`}
              aria-label="Ver detalles"
              className="link"
            >
              <FaEye className={"icon"} />
            </Link>
          </Tooltip>
          <Tooltip title="Borrar cliente">
            <button
              aria-label="Borrar cliente"
              onClick={() => handleIsDialogOpen(setIsDialogOpen)}
            >
              <RiDeleteBin6Line className={"icon"} color="red" />
            </button>
          </Tooltip>
        </>
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

    case SectionTypes.leads:
      buttons = (
        <Tooltip title="Verificar usuario">
          <button
            aria-label="Verificar usuario"
            onClick={() => {}}
            style={{
              background: "#8C9B6E",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            <MdVerifiedUser />
            <span>Veirifcar usuario</span>
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
