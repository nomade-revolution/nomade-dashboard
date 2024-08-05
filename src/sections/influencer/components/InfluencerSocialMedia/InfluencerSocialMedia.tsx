import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import getSocialMediaIcons from "./utils/getSocialMediaIcons";
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
          <span>{media.followers}</span>
        </li>
      ))}
    </InfluencerSocialMediaStyles>
  );
};

export default InfluencerSocialMedia;
