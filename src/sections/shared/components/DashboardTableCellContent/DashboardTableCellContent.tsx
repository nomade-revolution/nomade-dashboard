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
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

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
  const [acceptError, setAcceptError] = useState<string | null>(null);
  const { handleAcceptWithNotes } = useCollabsContext();

  const closeDialog = () => {
    setAcceptError(null);
    setIsDialogOpen(false);
  };

  // Handler for notes modal when accepting with notes
  const handleOnAcceptWithNotes = async (
    id: number,
    _reason?: number,
    _reasonText?: string,
    notes?: string,
  ) => {
    if (type !== CollabActionTypes.modifyStateWithNotes) return;

    setAcceptError(null);

    try {
      const result = await handleAcceptWithNotes(id, notes ?? "");
      if (result.success || result.partialSuccess) {
        // Close modal if state update succeeded (success) or if state was updated but notes failed (partialSuccess)
        // Notes are optional, so partialSuccess is acceptable - state change is the primary action
        setAcceptError(null);
        setIsDialogOpen(false);
        // Success - modal closes and list updates automatically via context
      } else {
        setAcceptError(
          result.error || "No se pudo actualizar el estado de la collab",
        );
      }
    } catch (error) {
      setAcceptError(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el estado de la collab",
      );
    }
  };

  return (
    <>
      <DashboardContentSections
        headerSection={headerSection}
        section={section}
        setIsDialogOpen={setIsDialogOpen}
        pageName={pageName}
        setCollabStateActionType={setCollabStateActionType}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />

      {isDialogOpen && (
        <DialogDeleteConfirm
          handleClose={closeDialog}
          open={isDialogOpen}
          errorMessage={acceptError}
          sectionId={"id" in section ? section.id! : 1}
          pageName={pageName}
          type={type}
          accept_state_id={
            (section as FullCollab).state?.id === COLAB_PENDING_NOMADE_STATE
              ? COLAB_PENDING_COMPANY_STATE
              : COLAB_ACCEPTED_STATE
          }
          onAccept={
            pageName === SectionTypes.collabs &&
            type === CollabActionTypes.modifyStateWithNotes
              ? handleOnAcceptWithNotes
              : undefined
          }
        />
      )}
    </>
  );
};

export default DashboardTableCellContent;
