import { Link } from "react-router-dom";
import { Customer } from "../../../../modules/customers/domain/Customers";
import { HeaderSection, SectionTypes } from "../../interfaces/interfaces";
import ImageCustom from "../ImageCustom/ImageCustom";
import { FaEye } from "react-icons/fa";
import {
  FaCheckDouble,
  FaInstagram,
  FaLink,
  FaLocationDot,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa6";
import { FullOffer, Offer } from "../../../../modules/offers/domain/Offer";
import { Switch, Tooltip } from "@mui/material";
import { Calendar, TimeSlotOffer } from "modules/offers/domain/OfferCalendar";
import { Company, User } from "modules/user/domain/User";
import { CollabActionTypes, FullCollab } from "modules/collabs/domain/Collabs";
import { getCollabStateClassname } from "./utils/getClassNames/getClassNames";
import Actions from "../Actions/Actions";
import { Influencer } from "@influencer";
import { Lead } from "modules/leads/domain/Leads";
import { Plan } from "modules/plans/domain/Plan";
import LinearBuffer from "../LinearBuffer/LinearBuffer";
import { COLAB_PUBLISHED_STATE } from "sections/collabs/utils/collabsStates";
import {
  SocialMedia,
  SocialMediaTypes,
} from "@influencer/domain/InfluencerSocialMedia";
import theme from "assets/styles/theme";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { formatSliceString } from "sections/shared/utils/getDateIntoHourFormat/getDateIntoHourFormat";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { AddresTableData } from "sections/offers/pages/OfferDetailPage/OfferDetailPage";
import getSocialMediaIcons from "sections/shared/utils/getSocialMediaIcons/getSocialMediaIcons";
import { parseFollowers } from "sections/influencer/utils/influencersSections";
import { Fragment } from "react";
import useActions from "sections/shared/hooks/useActions/useActions";

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
    | Plan
    | Calendar;
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
  const { user } = useAuthContext();
  const { modifyOffer } = useOffersContext();
  const { setSocialMediaSelected, setIsSocialMediaModalOpen } = useActions();

  const getBusinessUserCompanies = (section: User) => {
    const { companies } = section;
    if (!companies) return null;
    if (user.type !== "Company") {
      return companies.map((company: Company) => {
        return (
          <Fragment key={company.id}>
            <Tooltip title="Ver cliente">
              <Link
                to={`/cliente/${company.id}`}
                style={{
                  textDecoration: "underline",
                  color: theme.colors.mainColor,
                  textDecorationColor: theme.colors.mainColor,
                }}
              >
                <span className="dashboard__name">{company.company}</span>
              </Link>
            </Tooltip>
          </Fragment>
        );
      });
    }

    return companies.map((company) => {
      return (
        <Fragment>
          <span className="dashboard__name">{company.company}</span>
        </Fragment>
      );
    });
  };

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

    case "account_name": {
      if (pageName === SectionTypes.socialMedia) {
        return (
          <Link
            className="dashboard__content_link"
            style={{
              color: theme.colors.mainColor,
              textDecoration: "underline",
            }}
            to={(section as SocialMedia).url}
            target="_blank"
          >
            @{(section as SocialMedia).account_name}
          </Link>
        );
      }
      return null;
    }

    case "followers": {
      if (pageName === SectionTypes.socialMedia) {
        return (
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {parseFollowers((section as SocialMedia).followers)}
          </span>
        );
      }
      return null;
    }

    case "video": {
      if (pageName === SectionTypes.socialMedia) {
        if ((section as SocialMedia).video) {
          return (
            <Link
              style={{
                color: theme.colors.mainColor,
                textDecoration: "underline",
              }}
              to={(section as SocialMedia).video || ""}
              target="_blank"
            >
              Ver video
            </Link>
          );
        }
        return "-";
      }
      return null;
    }

    case "name":
      if (pageName === SectionTypes.socialMedia) {
        return (
          <button
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
            onClick={() => {
              setIsSocialMediaModalOpen(true);
              setSocialMediaSelected(section as SocialMedia);
            }}
          >
            {getSocialMediaIcons((section as SocialMedia).name)}
            <span
              style={{
                color: theme.colors.mainColor,
                textDecoration: "underline",
              }}
            >
              {(section as SocialMedia).name}
            </span>
          </button>
        );
      }

      return (
        <>
          {pageName !== SectionTypes.users ? (
            <Tooltip title="Ver perfil">
              <Link
                to={`/influencer/${(section as Influencer).id}`}
                className="dashboard__link-icon"
              >
                <span className="dashboard__name">{`${
                  (section as Influencer).name
                } ${
                  (section as Influencer).surnames
                    ? (section as Influencer).surnames
                    : ""
                }`}</span>
              </Link>
            </Tooltip>
          ) : (
            <span>{(section as User).name}</span>
          )}
        </>
      );

    case "name_compa":
      return (
        <Tooltip title="Ver perfil">
          <Link
            to={`/cliente/${(section as Company).id}`}
            className="dashboard__link-icon"
          >
            <span className="dashboard__name">
              {(section as Influencer).name}
            </span>
          </Link>
        </Tooltip>
      );
    case "email":
      return (
        <Tooltip title="Enviar email">
          <Link
            to={`mailto:${(section as Influencer).email}`}
            className="dashboard__link-icon"
          >
            <span className="dashboard__email">
              {(section as Influencer).email}
            </span>
          </Link>
        </Tooltip>
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
      if (pageName === "offerDetail") {
        return (
          <div className="dashboard__description">
            <span>{(section as Customer).description}</span>
          </div>
        );
      }
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
      if (pageName === SectionTypes.usersApp) {
        return (
          <div className="dashboard__btns-section">
            {getBusinessUserCompanies(section as User)}
          </div>
        );
      }

      return (
        <>
          {user.type !== "Company" ? (
            <Tooltip title="Ver cliente">
              <Link
                to={`/cliente/${
                  pageName === SectionTypes.customers ||
                  pageName === SectionTypes.plans ||
                  pageName === SectionTypes.usersApp
                    ? (section as Company).id
                    : pageName === SectionTypes.offers
                      ? (section as Offer).company_id
                      : pageName === SectionTypes.collabs
                        ? (section as FullCollab).company_id
                        : (section as Offer).user_id
                }`}
                style={{
                  textDecoration: "underline",
                  color: theme.colors.mainColor,
                  textDecorationColor: theme.colors.mainColor,
                }}
              >
                <span className="dashboard__name">
                  {(section as Company | FullCollab | Offer).company}
                </span>
              </Link>
            </Tooltip>
          ) : (
            <span className="dashboard__name">
              {(section as Company | FullCollab | Offer).company}
            </span>
          )}
        </>
      );

    case "company_name":
      return (
        <>
          {pageName !== SectionTypes.leads ? (
            <Tooltip title="Ver perfil">
              <Link
                to={`/cliente/${(section as Company).id}`}
                className="dashboard__link-icon"
              >
                <span className="dashboard__name">
                  {(section as Company).company_name}
                </span>
              </Link>
            </Tooltip>
          ) : (
            <span> {(section as Company).company_name}</span>
          )}
        </>
      );

    case "company_plan":
      return (
        <span
          className={`dashboard__plan${
            (section as Company).plan.plan_name === "Básico"
              ? "--basic"
              : (section as Company).plan.plan_name === "Estandar"
                ? "--standard"
                : (section as Company).plan.plan_name === "Premium"
                  ? "--premium"
                  : (section as Company).plan.plan_name === "Pendiente"
                    ? "--pending"
                    : ""
          }`}
        >
          {(section as Company).plan.plan_name}
        </span>
      );

    case "company_billing":
      return (
        <span
          className={`dashboard__plan${
            (section as Company).plan.billing === "Mensual"
              ? "--mensual"
              : (section as Company).plan.billing === "Trimestral"
                ? "--trimestral"
                : "--pending"
          }`}
        >
          {(section as Company).plan.billing
            ? (section as Company).plan.billing
            : "-"}
        </span>
      );

    case "status":
      return (
        <span
          className={`dashboard__status${
            (section as Company).status === "Activo"
              ? "--active"
              : (section as Company).status === "Inactivo"
                ? "--inactive"
                : (section as Company).status === "Pendiente"
                  ? "--pending"
                  : (section as Company).status === "Pausa"
                    ? "--standby"
                    : ""
          }`}
        >
          {(section as Company).status}
        </span>
      );

    case "company_comments":
      return (
        <span className="dashboard__comments">
          {(section as Company).company_comments
            ? formatSliceString((section as Company).company_comments)
            : "-"}
        </span>
      );

    case "roles":
      return (
        <span
          className={`dashboard__role${
            (section as User).roles[0] === 1
              ? "--admin"
              : (section as User).roles[0] === 2
                ? "--manager"
                : ""
          }`}
        >
          {(section as User).roles[0] === 1
            ? "Administrador"
            : (section as User).roles[0] === 2
              ? "Gestor"
              : "-"}
        </span>
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
                    day?.map((slot: TimeSlotOffer) => {
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
      if (pageName === "influencers") {
        return (
          <span className="dashboard__country">
            {(section as Influencer).state.name}
          </span>
        );
      }
      return (
        <Switch
          checked={(section as Offer).active ? true : false}
          onClick={() => {
            const formData = new FormData();
            formData.append("active", (section as Offer).active ? "0" : "1");
            modifyOffer(formData, (section as Offer).id);
          }}
        />
      );

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
        <>
          {(section as Influencer).categories.map((category) => {
            return (
              <span className="dashboard__category" key={category.name}>
                {category.name}
              </span>
            );
          })}
        </>
      );

    case "type":
      return <span className="dashboard__type">{(section as User).type}</span>;

    case "web":
      return (
        <Tooltip title={(section as Company).web}>
          <Link
            to={(section as Company).web}
            target="_blank"
            className="dashboard__web"
          >
            <FaLink size={20} color="#0a66c2" />
          </Link>
        </Tooltip>
      );

    case "influencer_name":
      return (
        <Tooltip title="Ver perfil">
          <Link
            to={`/influencer/${
              SectionTypes.collabs
                ? (section as FullCollab).influencer_id
                : (section as Influencer).id
            }`}
            className="dashboard__link-icon"
            style={{ textDecoration: "underline" }}
          >
            <span className="dashboard__name">
              {(section as FullCollab).influencer_name}
            </span>
          </Link>
        </Tooltip>
      );

    case "day":
      if (pageName === "collabDetail") {
        return (
          <span className="dashboard__type">
            {(section as FullCollab).day ? (section as FullCollab).day : " - "}
            {(section as FullCollab).time
              ? " - " + (section as FullCollab).time
              : "  "}
          </span>
        );
      }
      return (
        <span className="dashboard__type">
          {(section as FullCollab).day
            ? (section as FullCollab).day
            : (section as FullCollab).from_day ?? "-"}
        </span>
      );

    case "time":
      return (
        <span className="dashboard__type">
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
            (section as FullCollab).state.id,
            "dashboard",
          )}
        >
          {(section as FullCollab).state.name}
        </span>
      );

    case "history_update":
      return (
        <span className="dashboard__date">
          {(section as FullCollab).state.created_at}
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
              {
                (section as FullCollab).history[
                  (section as FullCollab).history.length - 1
                ].created_at
              }
            </span>
          ) : (
            <span className="dashboard__not-published">No publicada</span>
          )}
        </>
      );

    case "percentage":
      return (
        <section
          className="dashboard__progress"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearBuffer progress={(section as Plan).percentage} />
          <span
            className="dashboard__progress-percentage"
            style={{
              color: "white",
              position: "absolute",
              top: "0px",
              textAlign: "center",
            }}
          >
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
          {(section as Plan).start_date
            ? (section as Plan).start_date?.split(" ")[0]
            : "-"}
        </span>
      );

    case "end_date":
      return (
        <span className="dashboard__end-date">
          {(section as Plan).end_date
            ? (section as Plan).end_date?.split(" ")[0]
            : "-"}
        </span>
      );
    case "start_payment_date":
      return (
        <span className="dashboard__end-date">
          {(section as Plan).start_payment_date
            ? (section as Plan).start_payment_date?.split(" ")[0]
            : "-"}
        </span>
      );

    case "remaining":
      return (
        <section
          className="dashboard__progress"
          style={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinearBuffer
            progress={+(section as Plan).remaining?.replace("%", "")}
          />
          <span
            className="dashboard__progress-percentage"
            style={{ position: "absolute", color: "white", top: 0 }}
          >
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
              ? (section as Lead).sent_at
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
        <Link
          className={`dashboard__social-media`}
          to={main_social?.url as unknown as string}
          target="_blank"
        >
          {main_social?.name === SocialMediaTypes.instagram ? (
            <span
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "5px",
                textDecoration: "underline",
                fontWeight: 400,
              }}
            >
              <FaInstagram
                color="fuchsia"
                size={13}
                style={{ marginBottom: "-2px" }}
              />

              {"@" + main_social.account_name}
            </span>
          ) : main_social?.name === SocialMediaTypes.tiktok ? (
            <span>
              <FaTiktok size={13} />
              {"@" + main_social.account_name}
            </span>
          ) : main_social?.name === SocialMediaTypes.twitch ? (
            <span>
              <FaTwitch color="purple" size={13} />
              {"@" + main_social.account_name}
            </span>
          ) : main_social?.name === SocialMediaTypes.youtube ? (
            <span>
              <FaYoutube color={theme.colors.red} size={13} />
              {"@" + main_social.account_name}
            </span>
          ) : (
            ""
          )}
        </Link>
      );
    }

    case "social_media_followers": {
      const main_social = (section as Influencer).socialMedia.find(
        (social) => social.main,
      );
      return (
        <div className={`dashboard__social-media`}>
          {main_social?.name === SocialMediaTypes.instagram ? (
            <FaInstagram color="fuchsia" size={13} />
          ) : main_social?.name === SocialMediaTypes.tiktok ? (
            <FaTiktok size={13} />
          ) : main_social?.name === SocialMediaTypes.twitch ? (
            <FaTwitch color="purple" size={13} />
          ) : main_social?.name === SocialMediaTypes.youtube ? (
            <FaYoutube color={theme.colors.red} size={13} />
          ) : (
            ""
          )}
          <span>
            {main_social ? parseFollowers(main_social?.followers) : "-"}
          </span>
        </div>
      );
    }

    case "minimum": {
      return (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="dashboard__type">
            {section[headerSection.property as never]}
          </span>
        </section>
      );
    }

    case "calendar_detail": {
      return (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="dashboard__type">
            {(section as AddresTableData).address}
          </span>
        </section>
      );
    }
    case "address": {
      return (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="dashboard__type">
            {(section as Company)?.address?.address}
          </span>
        </section>
      );
    }

    case "week": {
      return (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "500px",
          }}
        >
          {(section as AddresTableData).time.map((day, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "10px",
                }}
                key={day.day + index}
              >
                <span>{day.day}</span>
                <span>{day.start_time}</span>
                <span>{day.end_time}</span>
              </div>
            );
          })}
        </section>
      );
    }
    case "objective": {
      return (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="dashboard__type">
            {section[headerSection.property as never]}
          </span>
        </section>
      );
    }
    case "colabs": {
      return (
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="dashboard__type">
            {section[headerSection.property as never]}
          </span>
        </section>
      );
    }

    default:
      return (
        <section>
          <span className="dashboard__type">
            {section[headerSection.property as never]}
          </span>
        </section>
      );
  }
};

export default DashboardContentSections;
