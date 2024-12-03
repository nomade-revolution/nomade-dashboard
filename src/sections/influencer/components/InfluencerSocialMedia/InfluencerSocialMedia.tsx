import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import getSocialMediaIcons from "../../../shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import InfluencerSocialMediaStyles from "./InfluencerSocialMediaStyled";

interface Props {
  socialMedia: SocialMedia[];
  setSocialMediaSelected: (value: SocialMedia) => void;
  setIsModalOpen: (value: boolean) => void;
}

const InfluencerSocialMedia = ({
  socialMedia,
  setIsModalOpen,
  setSocialMediaSelected,
}: Props): React.ReactElement => {
  return (
    <InfluencerSocialMediaStyles className="social-media">
      {socialMedia?.map((media) => (
        <li className="social-media__data" key={media.id}>
          <button
            className="social-media__data"
            onClick={() => {
              setIsModalOpen(true);
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
    </InfluencerSocialMediaStyles>
  );
};

export default InfluencerSocialMedia;
