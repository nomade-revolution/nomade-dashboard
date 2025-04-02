import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import InfluencerVideoPageStyled from "./InfluencerVideoPageStyled";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import getSocialMediaIcons from "sections/shared/utils/getSocialMediaIcons/getSocialMediaIcons";

const InfluencerVideoPage = (): React.ReactElement => {
  const { getInfluencer, influencer, loading } = useInfluencerContext();

  const { id } = useParams();

  useEffect(() => {
    getInfluencer(+id!);
  }, [getInfluencer, id]);

  if (loading) return <Loader width="20px" height="20px" />;

  return (
    <InfluencerVideoPageStyled className="influencer-detail">
      <GoBackButton />
      <section className="influencer-detail__header">
        <div className="influencer-detail__title">
          <h2>
            {influencer.name} {influencer.surnames}
          </h2>
        </div>
      </section>
      <section className="influencer-detail__info">
        {influencer.socialMedia?.map((socialMedia) => {
          return (
            <div key={socialMedia.id}>
              <h4 style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {getSocialMediaIcons(socialMedia.name, 20)}
                <Link to={socialMedia.url}>
                  <span style={{ textDecoration: "underline" }}>
                    @{socialMedia.account_name}
                  </span>
                </Link>
              </h4>

              {socialMedia.video ? (
                <video width="1280" height="720" controls>
                  <source src={socialMedia.video} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              ) : (
                "No hay video"
              )}
            </div>
          );
        })}
      </section>
    </InfluencerVideoPageStyled>
  );
};

export default InfluencerVideoPage;
