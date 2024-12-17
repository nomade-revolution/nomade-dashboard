import {
  Collab,
  CollabActionTypes,
  FullCollab,
} from "modules/collabs/domain/Collabs";
import { Customer } from "modules/customers/domain/Customers";
import { Offer } from "modules/offers/domain/Offer";
import { User } from "modules/user/domain/User";
import { useState } from "react";
import { HeaderSection } from "sections/shared/interfaces/interfaces";
import DialogDeleteConfirm from "../DialogDeleteConfirm/DialogDeleteConfirm";
import DashboardContentSections from "../DashboardContentSections/DashboardContentSections";
import { Influencer } from "@influencer";
import { Lead } from "modules/leads/domain/Leads";
import {
  COLAB_PENDING_NOMADE_STATE,
  COLAB_PENDING_COMPANY_STATE,
  COLAB_ACCEPTED_STATE,
} from "sections/collabs/utils/collabsStates";
import { Plan } from "modules/plans/domain/Plan";
import { Calendar } from "modules/offers/domain/OfferCalendar";

interface ReusableTableBodyCellProps {
  section:
    | Offer
    | Customer
    | Collab
    | User
    | Influencer
    | Lead
    | Plan
    | Calendar;
  headerSection: HeaderSection;
  pageName: string;
  type?: string;
  setCollabStateActionType?: (value: CollabActionTypes) => void;
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
}

const DashboardTableCellContent = ({
  headerSection,
  section,
  pageName,
  type,
  setCollabStateActionType,
  anchorEl,
  setAnchorEl,
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
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      }

      {isDialogOpen && (
        <DialogDeleteConfirm
          handleClose={() => setIsDialogOpen(false)}
          open={isDialogOpen}
          sectionId={"id" in section ? section.id! : 1}
          pageName={pageName}
          type={type}
          accept_state_id={
            (section as FullCollab).state.id === COLAB_PENDING_NOMADE_STATE
              ? COLAB_PENDING_COMPANY_STATE
              : COLAB_ACCEPTED_STATE
          }
        />
      )}
    </>
  );
};

export default DashboardTableCellContent;
