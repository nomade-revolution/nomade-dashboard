import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import MyAccountPageStyled from "./MyAccountPageStyled";
import ChangePasswordForm from "sections/user/components/ChangePasswordForm/ChangePasswordForm";

const MyAccountPage = (): React.ReactElement => {
  const { user } = useAuthContext();
  return (
    <MyAccountPageStyled className="my-account">
      <div className="section">
        <div className="data-section">
          <span className="data-title">Nombre</span>
          <span className="data">{user.name}</span>
        </div>

        <div className="data-section">
          <span className="data-title">Email</span>
          <span className="data">{user.email}</span>
        </div>
        <div className="data-section">
          <span className="data-title">Rol</span>
          <span className="data">{user.type}</span>
        </div>
      </div>
      <ChangePasswordForm />
    </MyAccountPageStyled>
  );
};

export default MyAccountPage;
