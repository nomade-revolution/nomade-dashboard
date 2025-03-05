import {
  getSideBarUpperSections,
  sideBarDownSections,
} from "../../../SideBar/utils/sideBarSections";
import { Link, useLocation } from "react-router-dom";
import DropdownMenuStyled from "./DropdownMenuStyled";
import { Divider } from "@mui/material";
import { User } from "modules/user/domain/User";
import { FullOffer } from "modules/offers/domain/Offer";

interface DropdownMenuProps {
  handleMenuState: () => void;
  handleLogout: () => void;
  badgeCountUsers: number;
  badgeCountInfluencers: number;
  badgeCountCompanies: number;
  badgeCountsLeads: number;
  user: User;
  offer: FullOffer;
}

const DropdownMenu = ({
  handleMenuState,
  handleLogout,
  badgeCountUsers,
  badgeCountInfluencers,
  badgeCountCompanies,
  badgeCountsLeads,
  user,
  offer,
}: DropdownMenuProps): React.ReactElement => {
  const location = useLocation();

  const sideBarUpperSections =
    user.type === "Company"
      ? getSideBarUpperSections(
          badgeCountUsers,
          badgeCountInfluencers,
          badgeCountCompanies,
          badgeCountsLeads,
          offer?.id,
        ).filter(
          (section) =>
            section.pathname === "collabs" || section.pathname === "oferta",
        )
      : getSideBarUpperSections(
          badgeCountUsers,
          badgeCountInfluencers,
          badgeCountCompanies,
          badgeCountsLeads,
        ).filter((section) => section.pathname !== "oferta");

  return (
    <DropdownMenuStyled>
      <ul className="dropdown-menu">
        {sideBarUpperSections.map((section) => (
          <li key={section.id}>
            <Link to={section.path} onClick={handleMenuState}>
              <div
                className={
                  location.pathname === section.path
                    ? "actions__section--active"
                    : "actions__section"
                }
              >
                <div className="actions__subsection">
                  <span
                    className={
                      location.pathname === section.path
                        ? "actions__icon--selected"
                        : "actions__icon"
                    }
                  >
                    {section.icon}
                  </span>
                  <span className="actions__name">{section.name}</span>
                </div>
                {section.quantity > 0 && (
                  <span className="actions__quantity">{section.quantity}</span>
                )}
              </div>
            </Link>
          </li>
        ))}
        <Divider />
        {sideBarDownSections.map((section) => (
          <li key={section.id}>
            <div key={section.id} className="user-actions__section">
              <span className="user-actions__icon">{section.icon}</span>
              <Link
                to={section.path}
                onClick={section.isLogout ? handleLogout : () => {}}
              >
                <span className="user-actions__name">{section.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </DropdownMenuStyled>
  );
};

export default DropdownMenu;
