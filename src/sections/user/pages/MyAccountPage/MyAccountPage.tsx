// import { mockFullUser } from "../../../../mocks/userMocks";
// import UserDatasheet from "../../components/UserDataSheet/UserDataSheet";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import MyAccountPageStyled from "./MyAccountPageStyled";

const MyAccountPage = (): React.ReactElement => {
  const { user } = useAuthContext();
  return (
    <MyAccountPageStyled className="my-account">
      {/* <UserDatasheet  /> */}
      <div>{JSON.stringify(user)}</div>
    </MyAccountPageStyled>
  );
};

export default MyAccountPage;
