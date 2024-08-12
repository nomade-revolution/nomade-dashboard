import { getSideBarUpperSections } from "./utils/sideBarSections";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import SideBarStyled from "./SideBarStyled";
import { appPaths } from "../../utils/appPaths/appPaths";
import ImageCustom from "../ImageCustom/ImageCustom";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

interface SideBarProps {
  pendingOrders: number;
  pendingCustomers: number;
}

const SideBar = ({
  pendingOrders,
  pendingCustomers,
}: SideBarProps): React.ReactElement => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { logoutUser } = useAuthContext();
  const sideBarUpperSections = getSideBarUpperSections(
    pendingOrders,
    pendingCustomers,
  );

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
        {sideBarUpperSections.map((section) => {
          // const isSubSectionActive =
          //   pathname.split("/")[1] === section.subSection;
          return (
            <div key={section.id}>
              <Link to={section.path} key={section.id + ""}>
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
                    <span className="actions__quantity">
                      {section.quantity}
                    </span>
                  )}
                </div>
              </Link>
              {/* {isSubSectionActive && (
                <div className="subsection">
                <span className="subsection__text">{section.subSection}</span>
                </div>
                )} */}
            </div>
          );
        })}
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
