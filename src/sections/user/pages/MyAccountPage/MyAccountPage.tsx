import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import MyAccountPageStyled from "./MyAccountPageStyled";

const MyAccountPage = (): React.ReactElement => {
  const { user } = useAuthContext();
  return (
    <MyAccountPageStyled className="my-account">
      <div>
        <div>
          <span>nombre</span>
          <span>{user.name}</span>
        </div>

        <div>
          <span>email</span>
          <span>{user.email}</span>
        </div>
        <div>
          <span>Rol</span>
          <span>{user.type}</span>
        </div>
      </div>
    </MyAccountPageStyled>
  );
};

export default MyAccountPage;
