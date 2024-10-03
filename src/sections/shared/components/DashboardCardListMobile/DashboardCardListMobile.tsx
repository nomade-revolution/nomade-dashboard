import { CollabActionTypes } from "modules/collabs/domain/Collabs";
import { HeaderSection } from "../../interfaces/interfaces";
import DashboardCardMobile from "../DashboardCardMobile/DashboardCardMobile";
import DashboardCardListMobileStyled from "./DashboardCardListMobileStyles";
import { useState } from "react";

interface DashboardCardListMobileProps {
  bodySections: object[];
  headerSections: HeaderSection[];
  pageName: string;
  type: CollabActionTypes;
  setCollabStateActionType?: (value: CollabActionTypes) => void;
}

const DashboardCardListMobile = ({
  bodySections,
  headerSections,
  pageName,
  type,
  setCollabStateActionType,
}: DashboardCardListMobileProps): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <DashboardCardListMobileStyled className="dashboard-list">
      {bodySections.map((section) => (
        <li key={Math.random()} className="dashboard-list__item">
          <DashboardCardMobile
            bodySection={section}
            headerSections={headerSections}
            pageName={pageName}
            setCollabStateActionType={setCollabStateActionType}
            type={type}
            setIsDialogOpen={setIsDialogOpen}
            isDialogOpen={isDialogOpen}
          />
        </li>
      ))}
    </DashboardCardListMobileStyled>
  );
};

export default DashboardCardListMobile;
