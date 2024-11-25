import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import CompanySocialMediaStyled from "./CompanySocialMediaStyled";
import getSocialMediaIcons from "sections/shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import { Link } from "react-router-dom";

interface Props {
  socialMedia: SocialMedia[];
}

const CompanySocialMedia = ({ socialMedia }: Props): React.ReactElement => {
  return (
    <CompanySocialMediaStyled className="social-media">
      {socialMedia?.map((media) => (
        <Link to={media.url} target="_blank" key={media.id}>
          <li className="social-media__data">
            {getSocialMediaIcons(media.name)}
            <span>{media.account_name}</span>
            <span>{media.followers}</span>
          </li>
        </Link>
      ))}
    </CompanySocialMediaStyled>
  );
};

export default CompanySocialMedia;
