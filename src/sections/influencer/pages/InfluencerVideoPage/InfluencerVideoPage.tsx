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

  const dummySocial = [
    {
      id: 1,
      main: true,
      name: "Instagram",
      url: "https://www.instagram.com/influencertest",
      account_name: "influencertest",
      followers: 95,
      video:
        "https://nomade-dev.fruntera.space/storage/videos/cUxpnKtub6splqZSM4rCmgkuSThCiTKYOwzdSddW.mov?expires=1739438155&signature=678aa8f53f53faee640c18bc3ce02cebf9a84e44bfb3f6daec84969ea1427cf9",
    },
    {
      id: 2,
      main: false,
      name: "TikTok",
      url: "https://www.tiktok.com/influencertest",
      account_name: "dummytiktokkk",
      followers: 95,
      video:
        "https://nomade-dev.fruntera.space/storage/videos/cUxpnKtub6splqZSM4rCmgkuSThCiTKYOwzdSddW.mov?expires=1739438155&signature=678aa8f53f53faee640c18bc3ce02cebf9a84e44bfb3f6daec84969ea1427cf9",
    },
    {
      id: 3,
      main: false,
      name: "Twitch",
      url: "https://www.tiktok.com/influencertest",
      account_name: "dummytwwiiiikkk",
      followers: 95,
      video: null,
    },
  ];
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
        {dummySocial?.map((socialMedia) => {
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
                <video width="640" height="360" controls>
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
