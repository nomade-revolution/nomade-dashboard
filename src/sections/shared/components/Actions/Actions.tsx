import { Tooltip } from "@mui/material";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import ActionsStyled from "./ActionsStyled";
import useActions from "sections/shared/hooks/useActions/useActions";
import { Offer } from "modules/offers/domain/Offer";
import {
  Collab,
  CollabActionTypes,
  CollabType,
  FullCollab,
} from "modules/collabs/domain/Collabs";
import { Company, User } from "modules/user/domain/User";
import { Customer } from "modules/customers/domain/Customers";
import { Influencer } from "@influencer";
import { Lead } from "modules/leads/domain/Leads";
import { BsSendCheckFill } from "react-icons/bs";
import { BsFillXSquareFill } from "react-icons/bs";
import * as collabStates from "../../../collabs/utils/collabsStates";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { MdOutlineHistory } from "react-icons/md";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import theme from "assets/styles/theme";

interface ActionsProps {
  pageName: string;
  setIsDialogOpen: (value: boolean) => void;
  section: object | Customer | Offer | FullCollab | User | Company | Lead;
  setCollabStateActionType?: (value: CollabActionTypes) => void;
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
}

const Actions = ({
  pageName,
  setIsDialogOpen,
  section,
  setCollabStateActionType,
  anchorEl,
  setAnchorEl,
}: ActionsProps): React.ReactElement => {
  let buttons: React.ReactNode;
  const { handleIsDialogOpen, handleSendLeadLink, handleCollabStateUpdate } =
    useActions();
  const { user } = useAuthContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  switch (pageName) {
    case SectionTypes.collabs:
      buttons = (
        <>
          <Tooltip title="Ver collab">
            <Link
              to={`/collab/${(section as FullCollab).id}`}
              aria-label="Consultar collab"
              className="link"
            >
              <FaEye className={"icon"} />
            </Link>
          </Tooltip>

          {((section as FullCollab).state.id ===
            collabStates.COLAB_PENDING_NOMADE_STATE ||
            (section as FullCollab).state.id ===
              collabStates.COLAB_PENDING_COMPANY_STATE) && (
            <>
              <Tooltip title="Aceptar">
                <button
                  aria-label="Aceptar"
                  onClick={() => {
                    handleIsDialogOpen(setIsDialogOpen),
                      setCollabStateActionType!(CollabActionTypes.accept);
                  }}
                >
                  <FaCheckCircle color="green" className="icon" />
                </button>
              </Tooltip>
              <Tooltip title="Rechazar">
                <button
                  aria-label="Rechazar"
                  onClick={() => {
                    handleIsDialogOpen(setIsDialogOpen),
                      setCollabStateActionType!(CollabActionTypes.refuse);
                  }}
                >
                  <BsFillXSquareFill className="icon" color="#C64B56" />
                </button>
              </Tooltip>
            </>
          )}
          {user.type === "Company" &&
            (section as FullCollab).state.id !==
              collabStates.COLAB_CANCELLED_STATE &&
            (section as FullCollab).state.id !==
              collabStates.COLAB_REJECTED_STATE &&
            (section as FullCollab).state.id !==
              collabStates.COLAB_SENT_STATE &&
            (section as FullCollab).state.id !==
              collabStates.COLAB_RECEIVED_STATE &&
            (section as FullCollab).state.id !==
              collabStates.COLAB_PUBLISHED_STATE && (
              <>
                <Tooltip title={"Estados collab"}>
                  <button aria-label="Estados" onClick={handleClick}>
                    <MdOutlineHistory
                      color="orange"
                      size={20}
                      className="icon--states"
                    />
                  </button>
                </Tooltip>
                {
                  <CustomDropdown
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    onClickFC={(selectedStateId) => {
                      handleCollabStateUpdate(
                        selectedStateId,
                        setIsDialogOpen,
                        setCollabStateActionType!,
                        section as Collab,
                        "detail",
                      );
                    }}
                    options={collabStates
                      .getCollabStates(
                        (section as FullCollab).state.id,
                        (section as FullCollab).type,
                      )
                      .filter((state) => state.type === CollabType.company)}
                  />
                }
              </>
            )}
        </>
      );
      break;
    case SectionTypes.offers:
      buttons = (
        <>
          <Tooltip title="Ver detalles">
            <Link
              to={`/oferta/${(section as Offer)?.id}`}
              aria-label="Ver detalles"
              className="link"
            >
              <FaEye className={"icon"} />
            </Link>
          </Tooltip>
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
        </>
      );
      break;
    case SectionTypes.customers:
      // buttons = (
      //   <>
      //     <Tooltip title="Ver detalles">
      //       <Link
      //         to={`/cliente/${(section as Company)?.id}`}
      //         aria-label="Ver detalles"
      //         className="link"
      //       >
      //         <FaEye className={"icon"} />
      //       </Link>
      //     </Tooltip>
      //   </>
      // );
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
        <Tooltip title="Enviar link">
          <button
            aria-label="Verificar usuario"
            onClick={() => handleSendLeadLink((section as Lead).id)}
            style={{
              background: (section as Lead).link_sent
                ? theme.colors.darkBlue
                : theme.colors.mainColor,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            <BsSendCheckFill />
            <span>
              {(section as Lead).link_sent ? "Volver a enviar" : "Enviar link"}
            </span>
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
