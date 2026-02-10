import ImageCustom from "../ImageCustom/ImageCustom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderStyled from "./HeaderStyled";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { User } from "modules/user/domain/User";
import { FullOffer } from "modules/offers/domain/Offer";
import useLogout from "@auth/hook/useLogout";

interface HeaderProps {
  badgeCountUsers: number;
  badgeCountInfluencers: number;
  badgeCountCompanies: number;
  badgeCountsLeads: number;
  badgeCountsCollabs: number;
  user: User;
  offer: FullOffer;
}

const Header = ({
  badgeCountUsers,
  badgeCountInfluencers,
  badgeCountCompanies,
  badgeCountsLeads,
  badgeCountsCollabs,
  user,
  offer,
}: HeaderProps): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const { token } = useAuthContext();
  const { handleLogout: logoutUser } = useLogout();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    handleMenuState();
    logoutUser();
    navigate(0);
  };

  return (
    <HeaderStyled className="header" ref={headerRef}>
      <ImageCustom
        alt="Nomade logo"
        className="header__image"
        height={36}
        width={144}
        image="/Nomade_Logo_Color.svg"
      />
      {pathname !== appPaths.login &&
        pathname !== appPaths.register &&
        pathname !== appPaths.termsConditionsOffline &&
        pathname !== appPaths.recovery_password &&
        pathname !== appPaths.new_password &&
        pathname !== appPaths.reset_password &&
        pathname !== appPaths.leadsSubmit &&
        token && (
          <div className="header__button-container">
            <button className="header__button" onClick={handleMenuState}>
              <div className="header__icons-section">
                <IoPersonCircleSharp className="header__profile-icon" />
                <MdOutlineKeyboardArrowDown
                  className="header__profile-subIcon"
                  aria-hidden
                />
              </div>
            </button>
          </div>
        )}
      {isMenuOpen && (
        <DropdownMenu
          handleLogout={handleLogOut}
          handleMenuState={handleMenuState}
          badgeCountUsers={badgeCountUsers}
          badgeCountInfluencers={badgeCountInfluencers}
          badgeCountCompanies={badgeCountCompanies}
          badgeCountsLeads={badgeCountsLeads}
          badgeCountsCollabs={badgeCountsCollabs}
          offer={offer}
          user={user}
        />
      )}
    </HeaderStyled>
  );
};

export default Header;
