import { Link } from "react-router-dom";
import { Customer } from "../../../../modules/customers/domain/Customers";
import { HeaderSection, SectionTypes } from "../../interfaces/interfaces";
import ImageCustom from "../ImageCustom/ImageCustom";
import { FaEye } from "react-icons/fa";
import {
  FaCheckDouble,
  FaInstagram,
  FaLocationDot,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa6";
import { FullOffer, Offer } from "../../../../modules/offers/domain/Offer";
import { Switch } from "@mui/material";
import { TimeSlot } from "modules/offers/domain/OfferCalendar";
import { Company, User } from "modules/user/domain/User";
import { CollabActionTypes, FullCollab } from "modules/collabs/domain/Collabs";
import {
  getCollabStateClassname,
  getTypesClassNames,
} from "./utils/getClassNames/getClassNames";
import Actions from "../Actions/Actions";
import { Influencer } from "@influencer";
import { Lead } from "modules/leads/domain/Leads";
import { Plan } from "modules/plans/domain/Plan";
import LinearBuffer from "../LinearBuffer/LinearBuffer";
import { COLAB_PUBLISHED_STATE } from "sections/collabs/utils/collabsStates";
import getDateIntoHourFormat from "sections/shared/utils/getDateIntoHourFormat/getDateIntoHourFormat";
import { SocialMediaTypes } from "@influencer/domain/InfluencerSocialMedia";
import theme from "assets/styles/theme";
import { formatDateWithSlash } from "sections/shared/utils/formatDate/formatDate";

interface Props {
  headerSection: HeaderSection;
  section:
    | object
    | Customer
    | Offer
    | FullCollab
    | User
    | Company
    | Lead
    | Plan;
  pageName: string;
  setIsDialogOpen: (value: boolean) => void;
  setCollabStateActionType?: (value: CollabActionTypes) => void;
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
}

const DashboardContentSections = ({
  headerSection,
  section,
  pageName,
  setIsDialogOpen,
  setCollabStateActionType,
  anchorEl,
  setAnchorEl,
}: Props) => {
  const calendar = (section as FullOffer).calendar;
  const daysSet = new Set<string>();

  switch (headerSection.property) {
    case "images":
      return (
        <ImageCustom
          image={(section as FullOffer).images[0].url}
          alt={(section as FullOffer).images[0].alt}
          className="dashboard__image"
          height={80}
          width={80}
        />
      );

    case "name":
      return (
        <Link to={`/influencer/${(section as Influencer).id}`}>
          <span>{`${(section as Influencer).name} ${
            (section as Influencer).surnames
              ? (section as Influencer).surnames
              : ""
          }`}</span>
        </Link>
      );

    case "image":
      return (
        <ImageCustom
          image={(section as Customer).image}
          alt=""
          className="dashboard__image"
          height={80}
          width={80}
        />
      );

    case "description":
      return (
        <div className="dashboard__description">
          <span>{(section as Customer).description}</span>
          <button className="dashboard__offers-button">
            Ofertas <FaEye />
          </button>
          <button className="dashboard__location">
            <FaLocationDot />
          </button>
        </div>
      );

    case "tags":
      return (
        <div className="dashboard__tags">
          {(section as Customer).tags.map((tag, index) => (
            <Link to={""} key={tag + index}>
              #{tag}
            </Link>
          ))}
        </div>
      );

    case "category":
      return (
        <span className="dashboard__category">
          {(section as Customer).category}
        </span>
      );

    case "subcategories":
      return (
        <div className="dashboard__subcategories">
          {(section as Customer).subcatgories.map((subcategory, index) => (
            <span className="dashboard__category" key={subcategory + index}>
              {subcategory}
            </span>
          ))}
        </div>
      );

    case "company":
      return (
        <Link
          to={`/cliente/${
            pageName === SectionTypes.customers
              ? (section as Company).id
              : (section as FullCollab).company
          }`}
        >
          {(section as Company | FullCollab).company}
        </Link>
      );

    case "calendar":
      if (!calendar || !Array.isArray(calendar)) {
        return <></>;
      }

      return (
        <div className="dashboard__time">
          <ul className="dashboard__time-list">
            {calendar.map((time) => (
              <li key={time.address_id}>
                {time.week?.map(
                  (day) =>
                    day?.map((slot: TimeSlot) => {
                      const dayInitial = slot.day_name.charAt(0);
                      if (!daysSet.has(dayInitial)) {
                        daysSet.add(dayInitial);
                        return (
                          <span
                            key={`${slot.day_of_week}-${slot.day_name}`}
                            className="dashboard__time-listItem"
                          >
                            {dayInitial}
                          </span>
                        );
                      }
                      return null;
                    }),
                )}
              </li>
            ))}
          </ul>
        </div>
      );

    case "reserves":
      return (
        <Link
          to={`/collabs-reservations/${(section as Offer).company_id}/page/1`}
          className="dashboard__reservations"
        >
          <FaEye />
          Reservas ({(section as Offer)?.reserves ?? 0})
        </Link>
      );

    case "state":
      return <Switch checked />;

    case "from_country":
      return (
        <span className="dashboard__country">
          {(section as Influencer).from_country?.name}
        </span>
      );

    case "living_country":
      return (
        <span className="dashboard__country">
          {(section as Influencer).living_country?.name}
        </span>
      );

    case "living_city":
      return (
        <span className="dashboard__country">
          {(section as Influencer).living_city?.name}
        </span>
      );

    case "categories":
      return (
        <span className="dashboard__category">
          {(section as Influencer).categories[0].name}
        </span>
      );

    case "type":
      return (
        <span className={getTypesClassNames(section, "dashboard")}>
          {(section as User).type}
        </span>
      );

    case "web":
      return (
        <Link
          to={(section as Company).web}
          target="_blank"
          className="dashboard__web"
        >
          {(section as Company).web}
        </Link>
      );

    case "influencer_name":
      return (
        <span className="dashboard__influencer">
          {(section as FullCollab).influencer_name}
        </span>
      );

    case "day":
      return (
        <span>
          {(section as FullCollab).day ? (section as FullCollab).day : "-"}
        </span>
      );

    case "time":
      return (
        <span>
          {(section as FullCollab).time ? (section as FullCollab).time : "-"}
        </span>
      );

    case "actions":
      return (
        <Actions
          pageName={pageName}
          setIsDialogOpen={setIsDialogOpen}
          section={section}
          setCollabStateActionType={setCollabStateActionType}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      );

    case "history":
      return (
        <span
          className={getCollabStateClassname(
            (section as FullCollab).history[
              (section as FullCollab).history.length - 1
            ].id,
            "dashboard",
          )}
        >
          {(section as FullCollab).history[
            (section as FullCollab).history.length - 1
          ].name === "Rechazada"
            ? "No aceptada"
            : (section as FullCollab).history[
                (section as FullCollab).history.length - 1
              ].name}
        </span>
      );

    case "history_update":
      return (
        <span className="dashboard__date">
          {getDateIntoHourFormat(
            new Date(
              (section as FullCollab).history[
                (section as FullCollab).history.length - 1
              ].created_at,
            ),
          )}
          {}
        </span>
      );

    case "published":
      return (
        <>
          {(section as FullCollab).history[
            (section as FullCollab).history.length - 1
          ].id === COLAB_PUBLISHED_STATE ? (
            <span className="dashboard__published">
              <FaCheckDouble />
              {formatDateWithSlash(
                (section as FullCollab).history[
                  (section as FullCollab).history.length - 1
                ].created_at,
              )}
            </span>
          ) : (
            <span className="dashboard__not-published">No publicada</span>
          )}
        </>
      );

    case "percentage":
      return (
        <section className="dashboard__progress">
          <LinearBuffer progress={(section as Plan).percentage} />
          <span className="dashboard__progress-percentage">
            {(section as Plan).percentage}%
          </span>
        </section>
      );

    case "plan":
      return (
        <span
          className={`dashboard__plan${
            (section as Plan).plan === "Básico"
              ? "--basic"
              : (section as Plan).plan === "Estandar"
                ? "--standard"
                : (section as Plan).plan === "Premium"
                  ? "--premium"
                  : (section as Plan).plan === "Pendiente"
                    ? "--pending"
                    : ""
          }`}
        >
          {(section as Plan).plan}
        </span>
      );

    case "start_date":
      return (
        <span className="dashboard__start-date">
          {(section as Plan).start_date ? (section as Plan).start_date : "-"}
        </span>
      );

    case "end_date":
      return (
        <span className="dashboard__end-date">
          {(section as Plan).end_date ? (section as Plan).end_date : "-"}
        </span>
      );

    case "remaining":
      return (
        <section className="dashboard__progress">
          <LinearBuffer
            progress={+(section as Plan).remaining.replace("%", "")}
          />
          <span className="dashboard__progress-percentage">
            {(section as Plan).remaining}
          </span>
        </section>
      );

    case "created_at":
    case "sent_at":
      return (
        <span className="dashboard__date">
          {headerSection.property === "created_at"
            ? (section as Lead).created_at.split(" ")[0]
            : (section as Lead).sent_at
              ? getDateIntoHourFormat(new Date((section as Lead).sent_at))
              : "No enviado"}
        </span>
      );

    case "link_sent":
      return (
        <span
          className={`${
            (section as Lead).link_sent
              ? "dashboard__link-sent"
              : "dashboard__link-pending"
          } `}
        >
          {(section as Lead).link_sent ? "Enviado" : "Pendiente"}
        </span>
      );

    case "social_media_mainRRSS": {
      const main_social = (section as Influencer).socialMedia.find(
        (social) => social.main,
      );
      return (
        <div className={`dashboard__social-media`}>
          {main_social?.name === SocialMediaTypes.instagram ? (
            <FaInstagram color="fuchsia" />
          ) : main_social?.name === SocialMediaTypes.tiktok ? (
            <FaTiktok />
          ) : main_social?.name === SocialMediaTypes.twitch ? (
            <FaTwitch color="purple" />
          ) : main_social?.name === SocialMediaTypes.youtube ? (
            <FaYoutube color={theme.colors.red} />
          ) : (
            ""
          )}
          <span>{main_social ? main_social?.name : "-"}</span>
        </div>
      );
    }

    case "social_media_followers": {
      const main_social = (section as Influencer).socialMedia.find(
        (social) => social.main,
      );
      return (
        <div className={`dashboard__social-media`}>
          {main_social?.name === SocialMediaTypes.instagram ? (
            <FaInstagram color="fuchsia" />
          ) : main_social?.name === SocialMediaTypes.tiktok ? (
            <FaTiktok />
          ) : main_social?.name === SocialMediaTypes.twitch ? (
            <FaTwitch color="purple" />
          ) : main_social?.name === SocialMediaTypes.youtube ? (
            <FaYoutube color={theme.colors.red} />
          ) : (
            ""
          )}
          <span>{main_social ? main_social?.followers : "-"}</span>
        </div>
      );
    }

    default:
      return (
        <section>
          <span>{section[headerSection.property as never]}</span>
        </section>
      );
  }
};

export default DashboardContentSections;
