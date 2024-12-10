import InfluecerDetailDataStyled from "./InfluencerDetailDataStyled";
import InfluencerCategories from "../InfluencerCategories/InfluencerCategories";
import InfluencerSocialMedia from "../InfluencerSocialMedia/InfluencerSocialMedia";
import { Influencer } from "@influencer";
import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";

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
  return (
    <InfluecerDetailDataStyled className="influencer-data">
      <div className="influencer-data__mainData">
        <div className="influencer-data__data">
          <div className="influencer-data__names">
            <span className="influencer-data__name">{influencer?.name}</span>

            <span>{influencer?.surnames}</span>
          </div>

          <span>{influencer.phone}</span>
          {influencer.email && <span>{influencer.email}</span>}
          {influencer.from_country && (
            <div className="influencer-data__from-country">
              <span>País de orígen:</span>
              <span className="influencer-data__country">
                {" "}
                {influencer?.from_country.name}
              </span>
            </div>
          )}
          {influencer.living_country && (
            <div className="influencer-data__living-country">
              <span>País de residéncia:</span>
              <span className="influencer-data__country">
                {" "}
                {influencer?.living_country.name}
              </span>
            </div>
          )}
        </div>
        <ImageCustom
          image={influencer.avatar}
          alt={influencer.name}
          className="avatar"
          height={80}
          width={80}
        />
      </div>
      {influencer.categories && (
        <InfluencerCategories categories={influencer.categories} />
      )}
      <InfluencerSocialMedia
        socialMedia={influencer.socialMedia}
        setSocialMediaSelected={setSocialMediaSelected}
        setIsModalOpen={setIsModalOpen}
      />
    </InfluecerDetailDataStyled>
  );
};

export default InfluencerDetailData;
