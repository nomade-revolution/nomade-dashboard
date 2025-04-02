import InfluecerDetailDataStyled from "./InfluencerDetailDataStyled";
import InfluencerCategories from "../InfluencerCategories/InfluencerCategories";
import InfluencerSocialMedia from "../InfluencerSocialMedia/InfluencerSocialMedia";
import { Influencer } from "@influencer";
import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

interface Props {
  influencer: Influencer;
  setSocialMediaSelected: (value: SocialMedia) => void;
  setIsModalOpen: (value: boolean) => void;
}

const InfluencerDetailData = ({
  influencer,
  setIsModalOpen,
  setSocialMediaSelected,
}: Props): React.ReactElement => {
  const { user } = useAuthContext();
  const mainSocialNetworks =
    influencer.socialMedia?.filter((rrss) => rrss.main === true) || [];

  return (
    <InfluecerDetailDataStyled className="influencer-data">
      <div className="influencer-data__mainData">
        <ImageCustom
          // this fix the image cache
          image={influencer.avatar + "?" + Date.now()}
          alt={influencer.name}
          className="avatar"
          height={80}
          width={80}
        />

        <div className="influencer-data__data">
          <div className="influencer-data__names">
            <span className="influencer-data__name">{influencer?.name}</span>

            <span>{influencer?.surnames}</span>
          </div>

          {user.type === "Nomade" && influencer.email && (
            <span>{influencer.email}</span>
          )}
          {user.type === "Nomade" && <span>{influencer.phone}</span>}

          {user.type === "Nomade" && influencer.gender && (
            <span>Género: {influencer.gender}</span>
          )}

          {user.type === "Nomade" && (
            <>
              {influencer.from_city && (
                <div className="influencer-data__from-country">
                  <span>Ciudad de origen:</span>
                  <span className="influencer-data__country">
                    {" "}
                    {influencer?.from_city.name}
                  </span>
                </div>
              )}
              {influencer.living_city && (
                <div className="influencer-data__living-country">
                  <span>Ciudad de residencia:</span>
                  <span className="influencer-data__country">
                    {" "}
                    {influencer?.living_city.name}
                  </span>
                </div>
              )}

              <div className="influencer-data__from-country">
                <span>Fecha de creación:</span>
                <span className="influencer-data__country">
                  {" "}
                  {influencer?.created_at || ""}
                </span>
              </div>
              <div className="influencer-data__from-country">
                <span>Estado:</span>
                <span className="influencer-data__country">
                  {" "}
                  {influencer?.state?.name || ""}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {influencer.categories && user.type === "Nomade" && (
        <InfluencerCategories categories={influencer.categories} />
      )}

      <InfluencerSocialMedia
        socialMedia={mainSocialNetworks}
        setSocialMediaSelected={setSocialMediaSelected}
        setIsModalOpen={setIsModalOpen}
      />
    </InfluecerDetailDataStyled>
  );
};

export default InfluencerDetailData;
