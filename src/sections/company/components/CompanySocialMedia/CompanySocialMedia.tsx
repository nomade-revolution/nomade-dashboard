import { CompanySocialMedia as ICompanySocialMedia } from "modules/user/domain/User";
import CompanySocialMediaStyled from "./CompanySocialMediaStyled";
import getSocialMediaIcons from "sections/shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import { Link } from "react-router-dom";
import { parseFollowers } from "sections/influencer/utils/influencersSections";

interface Props {
  socialMedia: ICompanySocialMedia[];
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
            {media.followers ? (
              <span>{parseFollowers(media.followers)} followers</span>
            ) : null}
          </Link>
        </li>
      ))}
    </CompanySocialMediaStyled>
  );
};

export default CompanySocialMedia;
