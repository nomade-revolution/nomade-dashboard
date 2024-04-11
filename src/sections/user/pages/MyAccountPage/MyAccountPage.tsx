import { mockFullUser } from "../../../../mocks/userMocks";
import UserDatasheet from "../../components/UserDataSheet/UserDataSheet";
import MyAccountPageStyled from "./MyAccountPageStyled";

const MyAccountPage = (): React.ReactElement => {
  return (
    <MyAccountPageStyled className="my-account">
      <UserDatasheet user={mockFullUser} />
    </MyAccountPageStyled>
  );
};

export default MyAccountPage;
