import { User } from "modules/user/domain/User";
import UserDetailDataStyled from "./UserDetailDataStyled";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import { useEffect } from "react";

interface Props {
  user: User;
}

const UserDetailData = ({ user }: Props): React.ReactElement => {
  const { getRolesList, rolesList } = useUserContext();

  useEffect(() => {
    if (rolesList.length === 0) {
      getRolesList();
    }
  }, [rolesList, getRolesList]);

  const currentRol = user.roles?.length ? user.roles[0] : 0;
  const userRol = rolesList.find((rol) => rol.id === currentRol);

  return (
    <UserDetailDataStyled className="influencer-data">
      <div className="influencer-data__mainData">
        <div className="influencer-data__data">
          <div className="influencer-data__names">
            <span className="influencer-data__name">
              {[user?.name, user?.surname].filter(Boolean).join(" ")}
            </span>
          </div>

          {user.email && <span>{user.email}</span>}

          <span>Rol: {userRol?.name || "Sin definir"}</span>
        </div>
      </div>
    </UserDetailDataStyled>
  );
};

export default UserDetailData;
