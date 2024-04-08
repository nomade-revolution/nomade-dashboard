import { HeaderSection } from "../../interfaces/interfaces";
import DashboardContentSections from "../DashboardContentSections/DashboardContentSections";
import DashboardCardMobileStyled from "./DashboardCardMobileStyles";

interface DashboardCardMobileProps {
  bodySection: object; // Canviar tipados
  headerSections: HeaderSection[];
  // type: SectionTypes;
}

const DashboardCardMobile = ({
  bodySection,
  headerSections,
  // type,
}: DashboardCardMobileProps): React.ReactElement => {
  return (
    <DashboardCardMobileStyled className="dashboard-card">
      {headerSections.map((headerSection, index) => (
        <div key={index}>
          <div className="dashboard-card__section">
            <span className="dashboard-card__section-title">
              {headerSection.name}
            </span>
            <DashboardContentSections
              headerSection={headerSection}
              section={bodySection}
              // type={type}
            />
          </div>
        </div>
      ))}
    </DashboardCardMobileStyled>
  );
};
export default DashboardCardMobile;
