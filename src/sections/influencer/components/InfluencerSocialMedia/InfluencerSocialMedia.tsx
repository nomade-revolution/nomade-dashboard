import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import getSocialMediaIcons from "../../../shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import InfluencerSocialMediaStyles from "./InfluencerSocialMediaStyled";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { Link } from "react-router-dom";
import { toK } from "sections/influencer/utils/influencersSections";

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
  const { user } = useAuthContext();
  return (
    <InfluencerSocialMediaStyles className="social-media">
      {socialMedia?.map((media) => (
        <li className="social-media__data" key={media.id}>
          {user.type === "Nomade" ? (
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
                {toK(media.followers)} followers
              </span>
            </button>
          ) : (
            <Link
              className={`social-media__data`}
              to={media.url}
              target="_blank"
            >
              {getSocialMediaIcons(media.name)}
              <span>{media.account_name}</span>
              <span className="social-media__followers">
                {toK(media.followers)} followers
              </span>
            </Link>
          )}
        </li>
      ))}
    </InfluencerSocialMediaStyles>
  );
};

export default InfluencerSocialMedia;
