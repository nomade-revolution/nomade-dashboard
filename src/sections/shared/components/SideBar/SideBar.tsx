import { getSideBarUpperSections } from "./utils/sideBarSections";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import SideBarStyled from "./SideBarStyled";
import { appPaths } from "../../utils/appPaths/appPaths";
import ImageCustom from "../ImageCustom/ImageCustom";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { Company, User } from "modules/user/domain/User";
import { FullOffer } from "modules/offers/domain/Offer";

interface SideBarProps {
  badgeUsers: number;
  badgeInfluencers: number;
  badgeCompanies: number;
  user: Company | User;
  offer: FullOffer;
}

const SideBar = ({
  badgeUsers,
  badgeInfluencers,
  badgeCompanies,
  user,
  offer,
}: SideBarProps): React.ReactElement => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { logoutUser } = useAuthContext();
  const sideBarUpperSections =
    user.type === "Company"
      ? getSideBarUpperSections(
          badgeUsers,
          badgeInfluencers,
          badgeCompanies,
          offer?.id,
        ).filter(
          (section) =>
            section.pathname === "collabs" || section.pathname === "oferta",
        )
      : getSideBarUpperSections(
          badgeUsers,
          badgeInfluencers,
          badgeCompanies,
        ).filter((section) => section.pathname !== "oferta");

  const handleLogout = () => {
    navigate(0);
    logoutUser();
  };

  return (
    <SideBarStyled className="side-bar">
      <ImageCustom
        alt="Fresatitan logo"
        className="side-bar__image"
        height={50}
        width={200}
        image="/main_logo.png"
      />
      <div className="side-bar__actions actions">
        {sideBarUpperSections.map((section) => (
          <Link to={section.path} key={section.id}>
            <div
              className={
                pathname.includes(section.path) ||
                pathname.includes(section.pathname!)
                  ? "actions__section--active"
                  : "actions__section"
              }
            >
              <div className="actions__subsection">
                <span
                  className={
                    pathname.includes(section.path) ||
                    pathname.includes(section.pathname!)
                      ? "actions__icon--selected"
                      : "actions__icon"
                  }
                >
                  {section.icon}
                </span>
                <span
                  className={
                    pathname.includes(section.path) ||
                    pathname.includes(section.pathname!)
                      ? "actions__name--selected"
                      : "actions__name"
                  }
                >
                  {section.name}
                </span>
              </div>
              {section.quantity > 0 && (
                <span className="actions__quantity">{section.quantity}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="side-bar__user-action user-actions">
        <div
          className={
            pathname.includes("mi-cuenta")
              ? "user-actions__section--active"
              : "user-actions__section"
          }
        >
          <span
            className={
              location.pathname.includes("mi-cuenta")
                ? "user-actions__icon--selected"
                : "user-actions__icon"
            }
          >
            <IoIosSettings />
          </span>
          <Link
            to={appPaths.account}
            className={
              location.pathname.includes("mi-cuenta")
                ? "user-actions__name--selected"
                : "user-actions__name"
            }
            aria-label={"Mi cuenta"}
          >
            Mi cuenta
          </Link>
        </div>
        <div className="user-actions__section">
          <span className="user-actions__icon">
            <CiLogout />
          </span>
          <button className="user-actions__name-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </SideBarStyled>
  );
};

export default SideBar;
