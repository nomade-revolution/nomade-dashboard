import { Link } from "react-router-dom";
import { Customer } from "../../../../modules/customers/domain/Customers";
import { HeaderSection } from "../../interfaces/interfaces";
import ImageCustom from "../ImageCustom/ImageCustom";
import { FaEye } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FullOffer, Offer } from "../../../../modules/offers/domain/Offer";
import { Switch } from "@mui/material";
import { TimeSlot } from "modules/offers/domain/OfferCalendar";
import { Company, User } from "modules/user/domain/User";
import { CollabActionTypes, FullCollab } from "modules/collabs/domain/Collabs";
import { getTypesClassNames } from "./utils/getClassNames/getClassNames";
import Actions from "../Actions/Actions";
import { Influencer } from "@influencer";
import { Lead } from "modules/leads/domain/Leads";

interface DashboardTableCellContentProps {
  headerSection: HeaderSection;
  section: object | Customer | Offer | FullCollab | User | Company | Lead;
  pageName: string;
  setIsDialogOpen: (value: boolean) => void;
  setCollabStateActionType?: (value: CollabActionTypes) => void;
}

const DashboardContentSections = ({
  headerSection,
  section,
  pageName,
  setIsDialogOpen,
  setCollabStateActionType,
}: DashboardTableCellContentProps) => {
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

    case "reservations":
      return (
        <Link to="" className="dashboard__reservations">
          <FaEye />
          Reservas (3)
        </Link>
      );

    case "state":
      return <Switch />;

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

    case "type":
      return (
        <span className={getTypesClassNames(section)}>
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
        />
      );

    case "history":
      return (
        <span>
          {
            (section as FullCollab).history[
              (section as FullCollab).history.length - 1
            ].name
          }
        </span>
      );

    default:
      return (
        <section>
          <span>{section[headerSection.property as never]}</span>
        </section>
      );
  }
};

export default DashboardContentSections;
