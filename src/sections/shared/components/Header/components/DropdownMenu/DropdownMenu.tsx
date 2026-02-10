import {
  getSideBarUpperSections,
  sideBarDownSections,
} from "../../../SideBar/utils/sideBarSections";
import { Link, useLocation } from "react-router-dom";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
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
  badgeCountsCollabs: number;
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
  badgeCountsCollabs,
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
          badgeCountsCollabs,
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
          badgeCountsCollabs,
        ).filter((section) => section.pathname !== "oferta");

  const cuentaSection = sideBarDownSections.find(
    (s) => s.path === appPaths.plan,
  );
  const downSectionsWithoutCuenta = sideBarDownSections.filter(
    (s) => s.path !== appPaths.plan,
  );

  return (
    <DropdownMenuStyled>
      <ul className="dropdown-menu">
        {cuentaSection && (
          <li key={cuentaSection.id}>
            <Link to={cuentaSection.path} onClick={handleMenuState}>
              <div
                className={
                  location.pathname === cuentaSection.path
                    ? "actions__section--active"
                    : "actions__section"
                }
              >
                <div className="actions__subsection">
                  <span
                    className={
                      location.pathname === cuentaSection.path
                        ? "actions__icon--selected"
                        : "actions__icon"
                    }
                  >
                    {cuentaSection.icon}
                  </span>
                  <span className="actions__name">{cuentaSection.name}</span>
                </div>
              </div>
            </Link>
          </li>
        )}
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
        {downSectionsWithoutCuenta.map((section) => (
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
