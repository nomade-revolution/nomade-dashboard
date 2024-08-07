import { Collab, CollabActionTypes } from "modules/collabs/domain/Collabs";
import { Customer } from "modules/customers/domain/Customers";
import { Offer } from "modules/offers/domain/Offer";
import { User } from "modules/user/domain/User";
import { useState } from "react";
import { HeaderSection } from "sections/shared/interfaces/interfaces";
import DialogDeleteConfirm from "../DialogDeleteConfirm/DialogDeleteConfirm";
import DashboardContentSections from "../DashboardContentSections/DashboardContentSections";
import { Influencer } from "@influencer";
import { Lead } from "modules/leads/domain/Leads";

interface ReusableTableBodyCellProps {
  section: Offer | Customer | Collab | User | Influencer | Lead;
  headerSection: HeaderSection;
  pageName: string;
  type?: string;
  setCollabStateActionType?: (value: CollabActionTypes) => void;
}

const DashboardTableCellContent = ({
  headerSection,
  section,
  pageName,
  type,
  setCollabStateActionType,
}: ReusableTableBodyCellProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      {
        <DashboardContentSections
          headerSection={headerSection}
          section={section}
          setIsDialogOpen={setIsDialogOpen}
          pageName={pageName}
          setCollabStateActionType={setCollabStateActionType}
        />
      }

      {isDialogOpen && (
        <DialogDeleteConfirm
          handleClose={() => setIsDialogOpen(false)}
          open={isDialogOpen}
          sectionId={section.id!}
          pageName={pageName}
          type={type}
        />
      )}
    </>
  );
};

export default DashboardTableCellContent;
