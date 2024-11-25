import {
  CitySocialRequest,
  CountrySocialRequest,
  SocialMedia,
  SocialMediaStatistic,
} from "@influencer/domain/InfluencerSocialMedia";
import getSocialMediaIcons from "sections/shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import SocialMediaCardStyled from "./SocialMediaCardStyled";
import { Link } from "react-router-dom";
import StadisticsDisplay from "../StatisticsDisplay/StatisticsDisplay";
import { FaLink, FaUserFriends } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

interface Props {
  socialMedia: SocialMedia;
  setIsModalOpenEdit: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
}

const SocialMediaCard = ({
  socialMedia,
  setIsModalOpenEdit,
  setIsModalOpen,
}: Props): React.ReactElement => {
  return (
    <SocialMediaCardStyled className="social-card">
      <button
        className="social-card__edit-btn"
        onClick={() => {
          setIsModalOpenEdit(true);
          setIsModalOpen(false);
        }}
      >
        Modificar
        <IoStatsChart />
      </button>
      {getSocialMediaIcons(socialMedia.name, 100)}
      <h3 className="social-card__title">{socialMedia.name}</h3>
      <section className="social-card__data">
        <span>@{socialMedia.account_name}</span>
        <span className="social-card__text-icon">
          <FaUserFriends size={20} /> {socialMedia.followers} followers
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
          barCategories={socialMedia.cities.map(
            (city) => (city as CitySocialRequest).name,
          )}
          data={socialMedia.cities.map((city) => city.followers_percentage)}
        />
      </section>
      <section>
        <h4 className="social-card__section-title">Estadísticas por país </h4>
        <StadisticsDisplay
          barCategories={socialMedia.countries.map(
            (country) => (country as CountrySocialRequest).name,
          )}
          data={socialMedia.countries.map(
            (country) => country.followers_percentage,
          )}
        />
      </section>
      <section>
        <h4 className="social-card__section-title">Estadísticas por edades </h4>
        <StadisticsDisplay
          barCategories={socialMedia.ageRanges.map(
            (age) => (age as SocialMediaStatistic).name,
          )}
          data={socialMedia.ageRanges.map((age) => age.followers_percentage)}
        />
      </section>
      <section>
        <h4 className="social-card__section-title">Estadísticas por genero </h4>
        <StadisticsDisplay
          barCategories={socialMedia.genders.map(
            (gender) => (gender as SocialMediaStatistic).name,
          )}
          data={socialMedia.genders.map(
            (gender) => gender.followers_percentage,
          )}
        />
      </section>
    </SocialMediaCardStyled>
  );
};

export default SocialMediaCard;
