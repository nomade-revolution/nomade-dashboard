import { HeaderSection } from "../../interfaces/interfaces";
import DashboardCardMobile from "../DashboardCardMobile/DashboardCardMobile";
import DashboardCardListMobileStyled from "./DashboardCardListMobileStyles";

interface DashboardCardListMobileProps {
  bodySections: object[];
  headerSections: HeaderSection[];
  pageName: string;
}

const DashboardCardListMobile = ({
  bodySections,
  headerSections,
  pageName,
}: DashboardCardListMobileProps): React.ReactElement => {
  return (
    <DashboardCardListMobileStyled className="dashboard-list">
      {bodySections.map((section) => (
        <li key={Math.random()} className="dashboard-list__item">
          <DashboardCardMobile
            bodySection={section}
            headerSections={headerSections}
            pageName={pageName}
          />
        </li>
      ))}
    </DashboardCardListMobileStyled>
  );
};

export default DashboardCardListMobile;
