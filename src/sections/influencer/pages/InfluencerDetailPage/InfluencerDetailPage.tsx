import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfluencerDetailData from "sections/influencer/components/InfluencerDetailData/InfluencerDetailData";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import InfluencerDetailPageStyled from "./InfluencerDetailPageStyled";
import InfluencerCollabs from "sections/influencer/components/InfluencerCollabs/InfluencerCollabs";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import useActions from "sections/shared/hooks/useActions/useActions";
import DialogDeleteConfirm from "sections/shared/components/DialogDeleteConfirm/DialogDeleteConfirm";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { FaRegTrashCan } from "react-icons/fa6";
import theme from "assets/styles/theme";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import SocialMediaCard from "sections/shared/components/SocialMediaCard/SocialMediaCard";
import SocialMediaForm from "sections/shared/components/SocialMediaForm/SocialMediaForm";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import InfluencerSocialMediaList from "sections/influencer/components/InfluencerSocialMediaList/InfluencerSocialMediaList";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import EditInfluencerForm from "sections/influencer/components/EditInfluencerForm/EditInfluencerForm";

const STATES_OPTIONS = [
  {
    id: "1",
    name: "Pendiente",
  },
  {
    id: "2",
    name: "Activo",
  },
  {
    id: "3",
    name: "Rechazado",
  },
  {
    id: "4",
    name: "Deshabilitado",
  },
  {
    id: "5",
    name: "Baneado",
  },
];

const InfluencerDetailPage = (): React.ReactElement => {
  const {
    getInfluencer,
    influencer,
    loading,
    socialMediaSelected,
    setSocialMediaSelected,
    isSocialMediaModalOpen,
    setIsSocialMediaModalOpen,
  } = useInfluencerContext();
  const { handleIsDialogOpen } = useActions();
  const { user } = useAuthContext();
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDialogEditStateOpen, setIsDialogEditStateOpen] =
    useState<boolean>(false);
  const [influencerState, setInfluencerState] = useState<number>(0);

  const { id } = useParams();

  const handleDeleteButton = () => {
    handleIsDialogOpen(setIsDialogOpen);
  };

  const handleModifyStateButton = (event: SelectChangeEvent<string>) => {
    const newValue = parseInt(event.target.value);
    setInfluencerState(newValue);
    handleIsDialogOpen(setIsDialogEditStateOpen);
  };

  useEffect(() => {
    getInfluencer(+id!);
  }, [getInfluencer, id]);

  const handleOnSubmit = () => {
    setIsEditFormOpen(false);
    getInfluencer(+id!);
  };

  if (loading) return <Loader width="20px" height="20px" />;

  const currentState = STATES_OPTIONS.find(
    (state) => state.id === String(influencer.state?.id),
  )?.id;

  return (
    <InfluencerDetailPageStyled className="influencer-detail">
      <GoBackButton />
      <section className="influencer-detail__header">
        <div className="influencer-detail__title">
          <h2>Influencer</h2>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentState}
            label="Estado"
            onChange={handleModifyStateButton}
          >
            {STATES_OPTIONS.map((state) => (
              <MenuItem value={state.id} disabled={state.id === "1"}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
          {user.type === "Nomade" && (
            <ActionButton
              onClick={() => setIsEditFormOpen(true)}
              text="Editar Influencer"
              icon={<FaEdit />}
              color={theme.colors.darkBlue}
            />
          )}
          {user.type === "Nomade" && (
            <ActionButton
              onClick={handleDeleteButton}
              text="Borrar"
              icon={<FaRegTrashCan />}
              color={theme.colors.red}
            />
          )}
        </div>
      </section>
      <section className="influencer-detail__info">
        <InfluencerDetailData
          influencer={influencer}
          setSocialMediaSelected={setSocialMediaSelected}
          setIsModalOpen={setIsSocialMediaModalOpen}
        />
      </section>

      <InfluencerSocialMediaList socialMedias={influencer.socialMedia} />

      {user.type === "Nomade" && <InfluencerCollabs influencer_id={+id!} />}

      <DialogDeleteConfirm
        handleClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        sectionId={influencer.id!}
        pageName={SectionTypes.influencers}
      />

      <DialogDeleteConfirm
        handleClose={() => setIsDialogEditStateOpen(false)}
        open={isDialogEditStateOpen}
        sectionId={influencer.id!}
        accept_state_id={influencerState}
        type="modifyState"
        pageName={SectionTypes.influencers}
        successText="Estado modificado"
      />

      <ReusableModal
        children={
          <EditInfluencerForm
            initialState={influencer}
            onSubmit={handleOnSubmit}
          />
        }
        openModal={isEditFormOpen}
        setIsModalOpen={setIsEditFormOpen}
        type="client"
      />

      <ReusableModal
        children={
          <SocialMediaCard
            socialMedia={socialMediaSelected}
            setIsModalOpenEdit={setIsOpenModalEdit}
            setIsModalOpen={setIsSocialMediaModalOpen}
          />
        }
        openModal={isSocialMediaModalOpen}
        setIsModalOpen={setIsSocialMediaModalOpen}
        type="social"
      />
      <ReusableModal
        children={
          <SocialMediaForm
            setIsModalOpen={setIsSocialMediaModalOpen}
            setIsModalOpenEdit={setIsOpenModalEdit}
            social={socialMediaSelected}
            influencer_id={+id!}
          />
        }
        openModal={isOpenModalEdit}
        setIsModalOpen={setIsOpenModalEdit}
        type="social"
      />
    </InfluencerDetailPageStyled>
  );
};

export default InfluencerDetailPage;
