import { useState } from "react";
import { HeaderSection } from "../../interfaces/interfaces";
import DashboardContentSections from "../DashboardContentSections/DashboardContentSections";
import DashboardCardMobileStyled from "../DashboardCardMobile/DashboardCardMobileStyles";

interface SimpleCardMobileProps {
  bodySection: object;
  headerSections: HeaderSection[];
  pageName: string;
}

/**
 * Renders a single row of table data as a mobile card (label + value per column).
 * Use for Plan, Company, Contacts etc. when no collab actions are needed.
 */
const SimpleCardMobile = ({
  bodySection,
  headerSections,
  pageName,
}: SimpleCardMobileProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [, setIsDialogOpen] = useState<boolean>(false);

  return (
    <DashboardCardMobileStyled className="dashboard-card">
      {headerSections.map((headerSection, index) => (
        <div key={headerSection.id ?? index}>
          <div className="dashboard-card__section">
            <span className="dashboard-card__section-title">
              {headerSection.name}
            </span>
            <div className="dashboard-card__section-content">
              <DashboardContentSections
                headerSection={headerSection}
                section={bodySection}
                pageName={pageName}
                setIsDialogOpen={setIsDialogOpen}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
              />
            </div>
          </div>
        </div>
      ))}
    </DashboardCardMobileStyled>
  );
};

export default SimpleCardMobile;
