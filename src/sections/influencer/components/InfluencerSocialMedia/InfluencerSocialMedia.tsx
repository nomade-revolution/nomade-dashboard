import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import getSocialMediaIcons from "../../../shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import InfluencerSocialMediaStyles from "./InfluencerSocialMediaStyled";
import { useState } from "react";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import SocialMediaCard from "sections/shared/components/SocialMediaCard/SocialMediaCard";

interface Props {
  socialMedia: SocialMedia[];
}

const InfluencerSocialMedia = ({ socialMedia }: Props): React.ReactElement => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [socialMediaSelected, setSocialMediaSelected] = useState<SocialMedia>(
    {} as SocialMedia,
  );

  return (
    <InfluencerSocialMediaStyles className="social-media">
      {socialMedia?.map((media) => (
        <li className="social-media__data">
          <button
            className="social-media__data"
            onClick={() => {
              setIsOpenModal(true);
              setSocialMediaSelected(media);
            }}
          >
            {getSocialMediaIcons(media.name)}
            <span>{media.account_name}</span>
            <span className="social-media__followers">
              {media.followers} followers
            </span>
          </button>
        </li>
      ))}
      <ReusableModal
        children={<SocialMediaCard socialMedia={socialMediaSelected} />}
        openModal={isOpenModal}
        setIsModalOpen={setIsOpenModal}
        type="social"
      />
    </InfluencerSocialMediaStyles>
  );
};

export default InfluencerSocialMedia;
