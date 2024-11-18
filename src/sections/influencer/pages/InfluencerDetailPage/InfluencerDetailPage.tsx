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

const InfluencerDetailPage = (): React.ReactElement => {
  const { getInfluencer, influencer, loading } = useInfluencerContext();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { handleIsDialogOpen } = useActions();

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
            <InfluencerDetailData influencer={influencer} />
          </section>
          <InfluencerCollabs influencer_id={+id!} />
          <DialogDeleteConfirm
            handleClose={() => setIsDialogOpen(false)}
            open={isDialogOpen}
            sectionId={influencer.id!}
            pageName={SectionTypes.influencers}
          />
        </InfluencerDetailPageStyled>
      )}
    </>
  );
};

export default InfluencerDetailPage;
