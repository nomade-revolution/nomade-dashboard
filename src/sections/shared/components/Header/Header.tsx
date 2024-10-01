import ImageCustom from "../ImageCustom/ImageCustom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderStyled from "./HeaderStyled";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { User } from "modules/user/domain/User";
import { FullOffer } from "modules/offers/domain/Offer";

interface HeaderProps {
  badgeCountUsers: number;
  badgeCountInfluencers: number;
  badgeCountCompanies: number;
  user: User;
  offer: FullOffer;
}

const Header = ({
  badgeCountUsers,
  badgeCountInfluencers,
  badgeCountCompanies,
  user,
  offer,
}: HeaderProps): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { logoutUser, token } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleMenuState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    handleMenuState();
    logoutUser();
    navigate(0);
  };

  return (
    <HeaderStyled className="header">
      <ImageCustom
        alt="Fresatitan logo"
        className="header__image"
        height={30}
        width={200}
        image="/main_logo.png"
      />
      {pathname !== appPaths.login &&
        pathname !== appPaths.register &&
        pathname !== appPaths.recovery_password &&
        pathname !== appPaths.reset_password &&
        pathname !== appPaths.leadsSubmit &&
        token && (
          <div className="header__button-container">
            <button className="header__button" onClick={handleMenuState}>
              <div className="header__icons-section">
                <IoPersonCircleSharp className="header__profile-icon" />
                <MdOutlineKeyboardArrowDown className="header__profile-subIcon" />
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
          offer={offer}
          user={user}
        />
      )}
    </HeaderStyled>
  );
};

export default Header;
