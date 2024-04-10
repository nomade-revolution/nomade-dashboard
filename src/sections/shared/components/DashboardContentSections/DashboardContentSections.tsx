import { Link } from "react-router-dom";
import { Customer } from "../../../../modules/customers/domain/Customers";
import { HeaderSection } from "../../interfaces/interfaces";
import ImageCustom from "../ImageCustom/ImageCustom";
import { FaEye } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface DashboardTableCellContentProps {
  headerSection: HeaderSection;
  section: object | Customer;
}

const DashboardContentSections = ({
  headerSection,
  section,
}: DashboardTableCellContentProps) => {
  switch (headerSection.property) {
    case "images":
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

    default:
      return (
        <section>
          <span>{section[headerSection.property as never]}</span>
        </section>
      );
  }
};

export default DashboardContentSections;
