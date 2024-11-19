import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import getSocialMediaIcons from "sections/shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import SocialMediaCardStyled from "./SocialMediaCardStyled";
import { Link } from "react-router-dom";
import StadisticsDisplay from "../StatisticsDisplay/StatisticsDisplay";
import { FaLink, FaUserFriends } from "react-icons/fa";

interface Props {
  socialMedia: SocialMedia;
}

const SocialMediaCard = ({ socialMedia }: Props): React.ReactElement => {
  return (
    <SocialMediaCardStyled className="social-card">
      {getSocialMediaIcons(socialMedia.name, 100)}
      <h3 className="social-card__title">{socialMedia.name}</h3>
      <section className="social-card__data">
        <span>@{socialMedia.account_name}</span>
        <span className="social-card__text-icon">
          <FaUserFriends /> {socialMedia.followers} followers
        </span>
        <Link
          to={socialMedia.url}
          className="social-card__text-link"
          target="_blank"
        >
          <FaLink color="#0a66c2" />
          {socialMedia.url}
        </Link>
      </section>
      {socialMedia.video && (
        <section>
          <h4 className="social-card__section-title">Vídeo</h4>
          <video width="640" height="360" controls>
            <source src={socialMedia.video} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </section>
      )}
      <section>
        <h4 className="social-card__section-title">Estadísticas por ciudad </h4>
        <StadisticsDisplay
          barCategories={socialMedia.cities.map((city) => city.name)}
          data={socialMedia.cities.map((city) => city.percentage)}
        />
      </section>
      <section>
        <h4 className="social-card__section-title">Estadísticas por país </h4>
        <StadisticsDisplay
          barCategories={socialMedia.countries.map((country) => country.name)}
          data={socialMedia.countries.map((country) => country.percentage)}
        />
      </section>
      <section>
        <h4 className="social-card__section-title">Estadísticas por edades </h4>
        <StadisticsDisplay
          barCategories={socialMedia.ageRanges.map((age) => age.name)}
          data={socialMedia.ageRanges.map((age) => age.percentage)}
        />
      </section>
      <section>
        <h4 className="social-card__section-title">Estadísticas por genero </h4>
        <StadisticsDisplay
          barCategories={socialMedia.genders.map((gender) => gender.name)}
          data={socialMedia.genders.map((gender) => gender.percentage)}
        />
      </section>
    </SocialMediaCardStyled>
  );
};

export default SocialMediaCard;
