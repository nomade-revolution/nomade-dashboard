import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfluencerDetailData from "sections/influencer/components/InfluencerDetailData/InfluencerDetailData";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
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
import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import SocialMediaCard from "sections/shared/components/SocialMediaCard/SocialMediaCard";
import SocialMediaForm from "sections/shared/components/SocialMediaForm/SocialMediaForm";

const InfluencerDetailPage = (): React.ReactElement => {
  const { getInfluencer, influencer, loading } = useInfluencerContext();
  const { handleIsDialogOpen } = useActions();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [socialMediaSelected, setSocialMediaSelected] = useState<SocialMedia>(
    {} as SocialMedia,
  );

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { id } = useParams();

  const handleDeleteButton = () => {
    handleIsDialogOpen(setIsDialogOpen);
  };

  useEffect(() => {
    getInfluencer(+id!);
  }, [getInfluencer, id]);
  return (
    <>
      {loading ? (
        <Loader height="20px" width="20px" />
      ) : (
        <InfluencerDetailPageStyled className="influencer-detail">
          <GoBackButton />
          <section className="influencer-detail__header">
            <div className="influencer-detail__title">
              <h2>Influencer</h2>
            </div>
            <ActionButton
              onClick={handleDeleteButton}
              text="Borrar"
              icon={<FaRegTrashCan />}
              color={theme.colors.red}
            />
          </section>
          <section className="influencer-detail__info">
            <ImageCustom
              image={influencer.avatar}
              alt={influencer.name}
              className="influencer-detail__avatar"
              height={150}
              width={150}
            />
            <InfluencerDetailData
              influencer={influencer}
              setSocialMediaSelected={setSocialMediaSelected}
              setIsModalOpen={setIsOpenModal}
            />
          </section>
          <InfluencerCollabs influencer_id={+id!} />
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
                setIsModalOpen={setIsOpenModal}
              />
            }
            openModal={isOpenModal}
            setIsModalOpen={setIsOpenModal}
            type="social"
          />
          <ReusableModal
            children={
              <SocialMediaForm
                setIsModalOpen={setIsOpenModal}
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
      )}
    </>
  );
};

export default InfluencerDetailPage;
