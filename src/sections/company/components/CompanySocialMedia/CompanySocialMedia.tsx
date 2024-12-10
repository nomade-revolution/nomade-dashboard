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
        <li className="social-media__data">
          <Link
            to={media.url}
            target="_blank"
            key={media.id}
            className="social-media__link"
          >
            {getSocialMediaIcons(media.name)}
            <span>@{media.account_name}</span>
            <span>{media.followers}</span>
          </Link>
        </li>
      ))}
    </CompanySocialMediaStyled>
  );
};

export default CompanySocialMedia;
