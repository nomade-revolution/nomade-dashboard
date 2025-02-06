import { useState } from "react";
import { HeaderSection } from "../../interfaces/interfaces";
import DashboardContentSections from "../DashboardContentSections/DashboardContentSections";
import DashboardCardMobileStyled from "./DashboardCardMobileStyles";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import useActions from "sections/shared/hooks/useActions/useActions";
import {
  CollabActionTypes,
  CollabType,
  FullCollab,
} from "modules/collabs/domain/Collabs";
import * as collabStates from "../../../collabs/utils/collabsStates";
import DialogDeleteConfirm from "../DialogDeleteConfirm/DialogDeleteConfirm";

interface DashboardCardMobileProps {
  bodySection: object;
  headerSections: HeaderSection[];
  pageName: string;
  type: CollabActionTypes;
  setCollabStateActionType?: (value: CollabActionTypes) => void;
}

const DashboardCardMobile = ({
  bodySection,
  headerSections,
  pageName,
  setCollabStateActionType,
  type,
}: DashboardCardMobileProps): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const { handleCollabStateUpdate } = useActions();

  let state_id: number | undefined;

  if (bodySection && (bodySection as FullCollab)?.history?.length) {
    state_id = (bodySection as FullCollab).history[
      (bodySection as FullCollab).history?.length - 1
    ]?.id;
  }

  return (
    <DashboardCardMobileStyled className="dashboard-card">
      {headerSections.map((headerSection, index) => (
        <div key={index}>
          <div className="dashboard-card__section">
            <span className="dashboard-card__section-title">
              {headerSection.name}
            </span>
            <DashboardContentSections
              // @ts-expect-error TODO por arreglar
              headerSection={headerSection}
              section={bodySection}
              pageName={pageName}
              setIsDialogOpen={setIsDialogOpen}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              setCollabStateActionType={setCollabStateActionType}
            />
          </div>
        </div>
      ))}
      <CustomDropdown
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onClickFC={() =>
          handleCollabStateUpdate(
            state_id!,
            setIsDialogOpen,
            setCollabStateActionType!,
            bodySection as FullCollab,
          )
        }
        options={collabStates
          .getCollabStates(state_id!, (bodySection as FullCollab).type)
          .filter((state) => state.type === CollabType.company)}
      />

      <DialogDeleteConfirm
        handleClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        sectionId={(bodySection as FullCollab).id!}
        pageName={pageName}
        type={type}
        accept_state_id={
          (bodySection as FullCollab)?.state &&
          (bodySection as FullCollab)?.state.id ===
            collabStates.COLAB_PENDING_NOMADE_STATE
            ? collabStates.COLAB_PENDING_COMPANY_STATE
            : collabStates.COLAB_ACCEPTED_STATE
        }
      />
    </DashboardCardMobileStyled>
  );
};
export default DashboardCardMobile;
