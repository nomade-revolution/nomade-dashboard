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
import { FaLink, FaUserFriends } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { FaPlay } from "react-icons/fa6";

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
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {getSocialMediaIcons(socialMedia.name, 30)} @
          {socialMedia.account_name}
        </span>
        <span className="social-card__text-icon">
          <FaUserFriends size={20} /> {socialMedia.followers} followers
        </span>
        {(socialMedia as any)?.stories_view && (
          <span className="social-card__text-icon">
            <FaPlay size={20} />{" "}
            {(socialMedia as any)?.stories_view
              ? (socialMedia as any)?.stories_view
              : "-"}
          </span>
        )}
        <span className="social-card__text-icon">
          <FaPlay size={20} />{" "}
          {(socialMedia as any)?.stories_view
            ? (socialMedia as any)?.stories_view
            : "-"}
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

      <section>
        <h4 className="social-card__section-title">Vídeo</h4>
        <video width="640" height="360" controls>
          <source src={socialMedia.video ?? ""} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </section>

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
