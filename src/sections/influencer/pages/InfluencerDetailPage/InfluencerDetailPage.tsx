import { useEffect } from "react";
import { useParams } from "react-router-dom";
import InfluencerDetailData from "sections/influencer/components/InfluencerDetailData/InfluencerDetailData";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import InfluencerDetailPageStyled from "./InfluencerDetailPageStyled";
import InfluencerCollabs from "sections/influencer/components/InfluencerCollabs/InfluencerCollabs";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";

const InfluencerDetailPage = (): React.ReactElement => {
  const { getInfluencer, influencer, loading } = useInfluencerContext();
  const { id } = useParams();

  useEffect(() => {
    getInfluencer(+id!);
  }, [getInfluencer, id]);

  return (
    <>
      {loading ? (
        <Loader height="40px" width="40px" />
      ) : (
        <InfluencerDetailPageStyled className="influencer-detail">
          <GoBackButton />
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
        </InfluencerDetailPageStyled>
      )}
    </>
  );
};

export default InfluencerDetailPage;
