import { User } from "modules/user/domain/User";
import UserAppDetailDataStyled from "./UserAppDetailDataStyled";

interface Props {
  user: User;
}

const UserAppDetailData = ({ user }: Props): React.ReactElement => {
  return (
    <UserAppDetailDataStyled className="influencer-data">
      <div className="influencer-data__mainData">
        <div className="influencer-data__data">
          <div className="influencer-data__names">
            <span className="influencer-data__name">
              {[user?.name, user?.surname].filter(Boolean).join(" ")}
            </span>
          </div>

          {user.email && <span>{user.email}</span>}
        </div>
      </div>
    </UserAppDetailDataStyled>
  );
};

export default UserAppDetailData;
