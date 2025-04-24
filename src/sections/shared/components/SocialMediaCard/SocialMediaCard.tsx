/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { FaUserFriends } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { FaPlay } from "react-icons/fa6";
import { parseFollowers } from "sections/influencer/utils/influencersSections";
import theme from "assets/styles/theme";

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
  const { user } = useAuthContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortByFollowers = (array: any[]) => {
    const a = array.sort(
      (a, b) => b.followers_percentage - a.followers_percentage,
    );
    return a;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortById = (array: any[]) => {
    const a = array.sort((a, b) => a.id - b.id);

    return a;
  };

  const sortedCities = sortByFollowers(socialMedia.cities);
  const sortedCountries = sortByFollowers(socialMedia.countries);
  const genders = sortById(socialMedia.genders);
  const ageRanges = sortById(socialMedia.ageRanges);

  return (
    <SocialMediaCardStyled className="social-card">
      {user.type === "Nomade" && (
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
      )}
      <section className="social-card__data">
        <Link
          className={`dashboard__content_link`}
          to={socialMedia.url}
          target="_blank"
        >
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              fontSize: 16,
              fontWeight: "bold",
              textDecoration: "underline",
              color: theme.colors.mainColor,
            }}
          >
            {getSocialMediaIcons(socialMedia.name, 30)} @
            {socialMedia.account_name}
          </span>
        </Link>
        <span className="social-card__text-icon">
          <FaUserFriends size={20} /> {parseFollowers(socialMedia.followers)}{" "}
          followers
        </span>
        {socialMedia?.stories_view && (
          <span className="social-card__text-icon">
            <FaPlay size={20} />{" "}
            {socialMedia?.stories_view
              ? `${parseFollowers(socialMedia?.stories_view)} visualizaciones`
              : "-"}
          </span>
        )}
      </section>

      {/* <section>
        <h4 className="social-card__section-title">Vídeo</h4>
        {socialMedia.video ? (
          <video width="640" height="360" controls>
            <source src={socialMedia.video} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        ) : (
          "No hay video"
        )}
      </section> */}

      <div className="stats-container">
        <section className="statsSection">
          <h4 className="social-card__section-title">
            Estadísticas por ciudad{" "}
          </h4>
          <StadisticsDisplay
            barCategories={sortedCities.map(
              (city) => (city as CitySocialRequest).name,
            )}
            data={sortedCities.map((city) => city.followers_percentage)}
          />
        </section>
        <section className="statsSection">
          <h4 className="social-card__section-title">Estadísticas por país </h4>
          <StadisticsDisplay
            barCategories={sortedCountries.map(
              (country) => (country as CountrySocialRequest).name,
            )}
            data={sortedCountries.map(
              (country) => country.followers_percentage,
            )}
          />
        </section>
      </div>
      <div className="stats-container">
        <section className="statsSection">
          <h4 className="social-card__section-title">
            Estadísticas por edades{" "}
          </h4>
          <StadisticsDisplay
            barCategories={ageRanges.map(
              (age) => (age as SocialMediaStatistic).name,
            )}
            data={ageRanges.map((age) => age.followers_percentage)}
          />
        </section>
        <section className="statsSection">
          <h4 className="social-card__section-title">
            Estadísticas por genero{" "}
          </h4>
          <StadisticsDisplay
            barCategories={genders.map(
              (gender) => (gender as SocialMediaStatistic).name,
            )}
            data={genders.map((gender) => gender.followers_percentage)}
          />
        </section>
      </div>
    </SocialMediaCardStyled>
  );
};

export default SocialMediaCard;
