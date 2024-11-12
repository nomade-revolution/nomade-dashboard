import { getSideBarUpperSections } from "./utils/sideBarSections";
import { Link, useLocation } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import SideBarStyled from "./SideBarStyled";
import { appPaths } from "../../utils/appPaths/appPaths";
import ImageCustom from "../ImageCustom/ImageCustom";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { Company, User } from "modules/user/domain/User";
import { FullOffer } from "modules/offers/domain/Offer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Tooltip } from "@mui/material";

interface SideBarProps {
  badgeUsers: number;
  badgeInfluencers: number;
  badgeCompanies: number;
  user: Company | User;
  offer: FullOffer;
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
}

const SideBar = ({
  badgeUsers,
  badgeInfluencers,
  badgeCompanies,
  user,
  offer,
  isMinimized,
  setIsMinimized,
}: SideBarProps): React.ReactElement => {
  const { pathname } = useLocation();

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
    logoutUser();
  };

  return (
    <SideBarStyled className="side-bar" $isMinimized={isMinimized}>
      {!isMinimized && (
        <ImageCustom
          alt="Nomade logo"
          className="side-bar__image"
          height={50}
          width={200}
          image="/main_logo.png"
        />
      )}
      <div className="side-bar__actions actions">
        <Tooltip title={isMinimized ? "Expandir menú" : "Ocultar menú"}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="actions__hide"
          >
            {isMinimized ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </Tooltip>
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
                <Tooltip title={isMinimized ? section.name : ""}>
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
                </Tooltip>
                {!isMinimized && (
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
                )}
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
          <Tooltip title={isMinimized ? "Mi cuenta" : ""}>
            <Link
              to={appPaths.account}
              className={
                location.pathname.includes("mi-cuenta")
                  ? "user-actions__name--selected"
                  : "user-actions__name"
              }
              aria-label={"Mi cuenta"}
            >
              <IoIosSettings size={20} />
              {!isMinimized && "Mi cuenta"}
            </Link>
          </Tooltip>
        </div>
        <div className="user-actions__section">
          <Tooltip title={isMinimized ? "Cerrar sesión" : ""}>
            <button
              className="user-actions__name-logout"
              onClick={handleLogout}
            >
              <CiLogout size={20} />
              {!isMinimized && "Cerrar sesión"}
            </button>
          </Tooltip>
        </div>
      </div>
    </SideBarStyled>
  );
};

export default SideBar;
