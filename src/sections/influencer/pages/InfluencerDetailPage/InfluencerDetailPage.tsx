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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { id } = useParams();

  const handleDeleteButton = () => {
    handleIsDialogOpen(setIsDialogOpen);
  };

  useEffect(() => {
    getInfluencer(+id!);
  }, [getInfluencer, id]);

  if (loading) return <Loader width="20px" height="20px" />;

  return (
    <InfluencerDetailPageStyled className="influencer-detail">
      <GoBackButton />
      <section className="influencer-detail__header">
        <div className="influencer-detail__title">
          <h2>Influencer</h2>
        </div>
        {user.type === "Nomade" && (
          <ActionButton
            onClick={handleDeleteButton}
            text="Borrar"
            icon={<FaRegTrashCan />}
            color={theme.colors.red}
          />
        )}
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
