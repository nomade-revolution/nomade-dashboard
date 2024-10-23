import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import getSocialMediaIcons from "../../../shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import InfluencerSocialMediaStyles from "./InfluencerSocialMediaStyled";

interface Props {
  socialMedia: SocialMedia[];
}

const InfluencerSocialMedia = ({ socialMedia }: Props): React.ReactElement => {
  return (
    <InfluencerSocialMediaStyles className="social-media">
      {socialMedia?.map((media) => (
        <li className="social-media__data">
          {getSocialMediaIcons(media.name)}
          <span>{media.account_name}</span>
          <span className="social-media__followers">
            {media.followers} followers
          </span>
        </li>
      ))}
    </InfluencerSocialMediaStyles>
  );
};

export default InfluencerSocialMedia;
