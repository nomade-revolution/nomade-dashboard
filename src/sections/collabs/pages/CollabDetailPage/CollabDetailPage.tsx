import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import CollabDetail from "sections/collabs/components/CollabDetail/CollabDetail";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import CollabsDetailPageStyled from "./CollabsDetailPageStyled";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useAddressContext } from "sections/address/AddressContext/useAddressContext";
import ReusableStepper from "sections/shared/components/ReusableStepper/ReusableStepper";
import { CollabActionTypes, CollabTypes } from "modules/collabs/domain/Collabs";
import useActions from "sections/shared/hooks/useActions/useActions";
import DialogDeleteConfirm from "sections/shared/components/DialogDeleteConfirm/DialogDeleteConfirm";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdDoNotDisturbOn } from "react-icons/md";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import {
  COLAB_PENDING_COMPANY_STATE,
  COLAB_PENDING_NOMADE_STATE,
} from "sections/collabs/utils/collabsStates";
import * as collabStates from "../../utils/collabsStates";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import EditCollabForm from "sections/collabs/components/CollabsForm/EditCollabsForm/EditCollabsForm";
import { UserTypes } from "modules/user/domain/User";
import { useMediaQuery } from "@mui/material";
import ActionMenu from "sections/shared/components/ActionMenu";

const MOBILE_BREAKPOINT = 768;

export interface CollabActionItem {
  key: string;
  label: string;
  icon: React.ReactElement;
  onClick: () => void;
  destructive?: boolean;
}

const HIDE_CANCEL_BUTTON_STATES = [
  collabStates.COLAB_REJECTED_STATE,
  collabStates.COLAB_CANCELLED_STATE,
  collabStates.COLAB_FINISHED_STATE,
  collabStates.COLAB_PUBLISHED_STATE,
];

const CollabDetailPage = (): React.ReactElement => {
  const {
    getCollabById,
    collab,
    loading,
    getAllRejectedCollabReasons,
    handleAcceptWithNotes,
    updateCollabState,
  } = useCollabsContext();
  const {
    getInfluencer,
    influencer,
    loading: loadingInfluencer,
  } = useInfluencerContext();
  const { getOffer, offer, loading: loadingOffer } = useOffersContext();
  const { getAddress } = useAddressContext();
  const { user } = useAuthContext();
  const { handleIsDialogOpen } = useActions();
  const { id } = useParams();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isAcceptOrRefuse, setIsAcceptOrRefuse] = useState<string>("");

  const handleOpenDialogDelete = () => {
    handleIsDialogOpen(setIsDialogOpen);
    setIsAcceptOrRefuse("");
  };

  const handleOpenDialogRefuse = () => {
    handleIsDialogOpen(setIsDialogOpen);
    setIsAcceptOrRefuse(CollabActionTypes.refuse);
  };

  const handleOpenDialogAccept = () => {
    handleIsDialogOpen(setIsDialogOpen);
    setIsAcceptOrRefuse(CollabActionTypes.modifyStateWithNotes);
  };

  const handleOpenDialogSendPackage = () => {
    handleIsDialogOpen(setIsDialogOpen);
    setIsAcceptOrRefuse(CollabActionTypes.sendPackage);
  };

  const handleOpenDialogCancel = () => {
    handleIsDialogOpen(setIsDialogOpen);
    setIsAcceptOrRefuse(CollabActionTypes.cancel);
  };

  // Client-specific handlers for state 3 (reuse list quick action flow)
  const handleOpenDialogAcceptClient = () => {
    handleIsDialogOpen(setIsDialogOpen);
    setIsAcceptOrRefuse(CollabActionTypes.accept);
  };

  const handleOpenDialogRefuseClient = () => {
    handleIsDialogOpen(setIsDialogOpen);
    setIsAcceptOrRefuse(CollabActionTypes.refuse);
  };

  const [collabStateActionType, setCollabStateActionType] =
    useState<CollabActionTypes | null>(null);

  const handleOnAcceptWithNotes = async (
    id: number,
    _reason?: number,
    _reasonText?: string,
    notes?: string,
  ) => {
    if (isAcceptOrRefuse !== CollabActionTypes.modifyStateWithNotes) return;

    // DEV-only debug logging
    const isDev = import.meta.env.MODE !== "production";
    if (isDev) {
      // Debug logging removed for production
    }

    try {
      const result = await handleAcceptWithNotes(id, notes ?? "");
      if (result.success || result.partialSuccess) {
        // Close modal if state update succeeded (success) or if state was updated but notes failed (partialSuccess)
        // Notes are optional, so partialSuccess is acceptable - state change is the primary action
        setIsDialogOpen(false);
        // Success - modal closes and timeline updates automatically via context
      } else {
        // Error - keep modal open for retry
        // Error logging removed for production
      }
    } catch (error) {
      // Error logging removed for production
    }
  };

  const handleOnRejectWithReason = async (
    id: number,
    reasonId?: number,
    reasonText?: string,
  ) => {
    if (isAcceptOrRefuse !== CollabActionTypes.refuse) return;

    try {
      await updateCollabState(
        id,
        collabStates.COLAB_REJECTED_STATE,
        reasonId,
        reasonText,
      );

      setIsDialogOpen(false);
      // Success - timeline updates automatically via context
    } catch (error) {
      // Keep modal open for retry
    }
  };

  useEffect(() => {
    getCollabById(+id!);
    getAllRejectedCollabReasons();
  }, [getCollabById, getAllRejectedCollabReasons, id]);

  useEffect(() => {
    if (collab.influencer_id != null && collab.influencer_id !== undefined) {
      getInfluencer(collab.influencer_id);
    }
  }, [collab.influencer_id, getInfluencer]);

  useEffect(() => {
    if (collab.offer_id != null && collab.offer_id !== undefined) {
      getOffer(collab.offer_id);
    }
  }, [collab.offer_id, getOffer]);

  useEffect(() => {
    if (collab.addresses_id != null && collab.addresses_id !== undefined) {
      getAddress(collab.addresses_id);
    }
  }, [collab.addresses_id, getAddress]);

  const showCancelButton = () => {
    if (collab.state && HIDE_CANCEL_BUTTON_STATES.includes(collab.state.id)) {
      return false;
    }
    if (user.type !== "Nomade") {
      return false;
    }
    return true;
  };

  const isMobile = useMediaQuery(`(max-width:${MOBILE_BREAKPOINT}px)`);

  const collabActions = useMemo((): CollabActionItem[] => {
    const primary: CollabActionItem[] = [];
    const operational: CollabActionItem[] = [];
    const destructive: CollabActionItem[] = [];

    if (user.type === "Nomade") {
      primary.push({
        key: "editar",
        label: "Editar",
        icon: <FaEdit />,
        onClick: () => setIsOpenEdit(true),
      });
    }

    if (
      collab.state &&
      collab.state.id === COLAB_PENDING_NOMADE_STATE &&
      user.type === "Nomade"
    ) {
      operational.push(
        {
          key: "aceptar",
          label: "Aceptar",
          icon: <FaCheckCircle />,
          onClick: handleOpenDialogAccept,
        },
        {
          key: "rechazar",
          label: "Rechazar",
          icon: <MdDoNotDisturbOn />,
          onClick: handleOpenDialogRefuse,
        },
      );
      destructive.push({
        key: "borrar",
        label: "Borrar",
        icon: <FaRegTrashCan />,
        onClick: handleOpenDialogDelete,
        destructive: true,
      });
    }

    if (
      collab.state &&
      collab.state.id === COLAB_PENDING_COMPANY_STATE &&
      user.type === "Company"
    ) {
      operational.push(
        {
          key: "aceptar",
          label: "Aceptar",
          icon: <FaCheckCircle />,
          onClick: handleOpenDialogAcceptClient,
        },
        {
          key: "rechazar",
          label: "Rechazar",
          icon: <MdDoNotDisturbOn />,
          onClick: handleOpenDialogRefuseClient,
        },
      );
    }

    if (
      user.type === UserTypes.company &&
      collab.type === CollabTypes.brand &&
      collab.state &&
      (collab.state.id === collabStates.COLAB_INCIDENT_STATE ||
        collab.state.id === collabStates.COLAB_ACCEPTED_STATE)
    ) {
      operational.push({
        key: "paquete-enviado",
        label: "Paquete enviado",
        icon: <FaCheckCircle />,
        onClick: handleOpenDialogSendPackage,
      });
    }

    if (showCancelButton()) {
      destructive.push({
        key: "cancelar",
        label: "Cancelar",
        icon: <IoMdCloseCircleOutline size={15} />,
        onClick: handleOpenDialogCancel,
        destructive: true,
      });
    }

    return [...primary, ...operational, ...destructive];
  }, [user.type, collab.state, collab.type]);

  return (
    <>
      {loading || loadingInfluencer || loadingOffer ? (
        <Loader height="20px" width="20px" />
      ) : (
        <CollabsDetailPageStyled className="detail-collab">
          {/* Mobile: header bar with outer space, back + title + actions menu */}
          {isMobile && (
            <header className="detail-collab__header-bar-mobile">
              <div className="detail-collab__back-wrap-mobile">
                <GoBackButton />
              </div>
              <h2 className="detail-collab__title-mobile">Collab</h2>
              {collabActions.length > 0 ? (
                <ActionMenu
                  actions={collabActions}
                  variant="auto"
                  align="right"
                />
              ) : (
                <span style={{ width: 44, flexShrink: 0 }} />
              )}
            </header>
          )}

          {/* Desktop: go-back + header with title and action buttons */}
          <div className="detail-collab__desktop-top">
            <GoBackButton />
            <header className="detail-collab__header">
              <h2>Collab</h2>
              <section className="detail-collab__actions detail-collab__actions--desktop">
                <ActionMenu
                  actions={collabActions}
                  variant="auto"
                  align="right"
                />
              </section>
            </header>
          </div>

          <div className="detail-collab__data detail-collab__content-wrap">
            <CollabDetail
              collab={collab}
              influencer={influencer}
              offer={offer}
            />
            <section className="detail-collab__stepper">
              <h3>Estados</h3>
              <ReusableStepper
                steps={collab.history}
                setCollabStateActionType={setCollabStateActionType}
                collab={collab}
                collabStateActionType={collabStateActionType!}
              />
            </section>
          </div>
          <>
            <ReusableModal
              openModal={isOpenEdit}
              setIsModalOpen={setIsOpenEdit}
              type="Collab"
            >
              <EditCollabForm
                collab={collab}
                offer={offer}
                setIsOpen={setIsOpenEdit}
              />
            </ReusableModal>
            <DialogDeleteConfirm
              handleClose={() => setIsDialogOpen(false)}
              open={isDialogOpen}
              onAccept={
                isAcceptOrRefuse === CollabActionTypes.modifyStateWithNotes
                  ? handleOnAcceptWithNotes
                  : isAcceptOrRefuse === CollabActionTypes.refuse
                    ? handleOnRejectWithReason
                    : undefined
              }
              sectionId={collab.id!}
              pageName={SectionTypes.collabs}
              type={isAcceptOrRefuse}
              accept_state_id={
                isAcceptOrRefuse === CollabActionTypes.modifyStateWithNotes
                  ? COLAB_PENDING_COMPANY_STATE
                  : isAcceptOrRefuse === CollabActionTypes.refuse
                    ? collabStates.COLAB_REJECTED_STATE
                    : isAcceptOrRefuse === CollabActionTypes.accept
                      ? collabStates.COLAB_ACCEPTED_STATE
                      : collab.state &&
                          collab.state.id === COLAB_PENDING_NOMADE_STATE
                        ? COLAB_PENDING_COMPANY_STATE
                        : collabStates.COLAB_ACCEPTED_STATE
              }
            />
          </>
        </CollabsDetailPageStyled>
      )}
    </>
  );
};

export default CollabDetailPage;
