import { useEffect, useState } from "react";
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
import { CollabActionTypes } from "modules/collabs/domain/Collabs";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import useActions from "sections/shared/hooks/useActions/useActions";
import DialogDeleteConfirm from "sections/shared/components/DialogDeleteConfirm/DialogDeleteConfirm";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdDoNotDisturbOn } from "react-icons/md";
import theme from "assets/styles/theme";
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

const CollabDetailPage = (): React.ReactElement => {
  const { getCollabById, collab, loading } = useCollabsContext();
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
    setIsAcceptOrRefuse(CollabActionTypes.accept);
  };

  const handleOpenDialogCancel = () => {
    handleIsDialogOpen(setIsDialogOpen);
    setIsAcceptOrRefuse(CollabActionTypes.cancel);
  };

  const [collabStateActionType, setCollabStateActionType] =
    useState<CollabActionTypes | null>(null);

  useEffect(() => {
    getCollabById(+id!);
  }, [getCollabById, id]);

  useEffect(() => {
    getInfluencer(collab.influencer_id);
  }, [collab.influencer_id, getInfluencer]);

  useEffect(() => {
    getOffer(collab.offer_id);
  }, [collab.offer_id, getOffer]);

  useEffect(() => {
    getAddress(collab.addresses_id);
  }, [collab.addresses_id, getAddress]);

  //Añadir botones para modificar estado en usuario company
  return (
    <>
      {loading || loadingInfluencer || loadingOffer ? (
        <Loader height="20px" width="20px" />
      ) : (
        <CollabsDetailPageStyled className="detail-collab">
          <GoBackButton />
          <header className="detail-collab__header">
            <h2>Collab</h2>
            <section className="detail-collab__actions">
              {user.type === "Nomade" && (
                <ActionButton
                  icon={<IoMdCloseCircleOutline size={15} />}
                  onClick={handleOpenDialogCancel}
                  text="Cancelar"
                  color={theme.colors.black}
                />
              )}
              {collab.state &&
                (collab.state.id === COLAB_PENDING_COMPANY_STATE ||
                  collab.state.id === COLAB_PENDING_NOMADE_STATE) &&
                user.type === "Nomade" && (
                  <>
                    <ActionButton
                      icon={<FaCheckCircle />}
                      onClick={handleOpenDialogAccept}
                      text="Aceptar"
                      color={theme.colors.softGreen}
                    />
                    <ActionButton
                      icon={<MdDoNotDisturbOn />}
                      onClick={handleOpenDialogRefuse}
                      text="Rechazar"
                      color={theme.colors.darkRed}
                    />

                    <ActionButton
                      onClick={() => setIsOpenEdit(true)}
                      text="Editar"
                      icon={<FaEdit />}
                      color={theme.colors.darkBlue}
                    />
                    <ActionButton
                      onClick={handleOpenDialogDelete}
                      text="Borrar"
                      icon={<FaRegTrashCan />}
                      color={theme.colors.red}
                    />
                  </>
                )}
            </section>
          </header>
          <div className="detail-collab__data">
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
            >
              <EditCollabForm collab={collab} setIsOpen={setIsOpenEdit} />
            </ReusableModal>
            <DialogDeleteConfirm
              handleClose={() => setIsDialogOpen(false)}
              open={isDialogOpen}
              sectionId={collab.id!}
              pageName={SectionTypes.collabs}
              type={isAcceptOrRefuse}
              accept_state_id={
                collab.state &&
                collab.state.id === collabStates.COLAB_PENDING_NOMADE_STATE
                  ? collabStates.COLAB_PENDING_COMPANY_STATE
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
