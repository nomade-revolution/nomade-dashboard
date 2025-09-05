import Box from "@mui/material/Box";
import {
  CollabActionTypes,
  FullCollab,
  State,
} from "modules/collabs/domain/Collabs";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { MdOutlineHistory } from "react-icons/md";
import ReusableStepperStyled from "./ReusableStepperStyled";
import CustomDropdownV2 from "../CustomDropdownV2/CustomDropdownV2";
import { useState } from "react";
import * as collabStates from "../../../collabs/utils/collabsStates";
import DialogDeleteConfirm from "../DialogDeleteConfirm/DialogDeleteConfirm";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import ActionButton from "../ActionButton/ActionButton";
import { FaCheckCircle } from "react-icons/fa";
import theme from "assets/styles/theme";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import CollabsStateTimelineV2 from "../CollabsStateTimeline/CollabsStateTimelineV2";

interface Props {
  steps: State[];
  setCollabStateActionType: (value: CollabActionTypes) => void;
  collab: FullCollab;
  collabStateActionType: CollabActionTypes;
}

export default function ReusableStepper({
  setCollabStateActionType,
  collab,
  collabStateActionType,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStateToModify, setSelectedStateToModify] = useState<
    number | null
  >(null);

  const { user } = useAuthContext();
  const { updateCollabState, handleAcceptWithNotes } = useCollabsContext();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleActionSelected = (state_id: number) => {
    setAnchorEl(null);
    setSelectedStateToModify(state_id);
    setIsDialogOpen(true);

    // Special handling for state 2 (Pendiente aceptación empresa)
    if (state_id === collabStates.COLAB_PENDING_COMPANY_STATE) {
      setCollabStateActionType(CollabActionTypes.modifyStateWithNotes);
    } else if (collabStates.COLAB_REJECTED_STATE === state_id) {
      setCollabStateActionType(CollabActionTypes.refuse);
    } else {
      setCollabStateActionType(CollabActionTypes.modifyState);
    }
    // TODO añadir el mismo modo que "rechazar" para "incidencia"
  };

  const handleOnAccept = async (
    id: number,
    reason?: number,
    reasonText?: string,
    notes?: string,
  ) => {
    if (!selectedStateToModify) return;

    // Special handling for state 2 with notes
    if (
      selectedStateToModify === collabStates.COLAB_PENDING_COMPANY_STATE &&
      notes !== undefined
    ) {
      const result = await handleAcceptWithNotes(id, notes);

      if (result.success) {
        setIsDialogOpen(false);
      } else if (result.partialSuccess) {
        // Keep modal open for retry
      } else {
        // Keep modal open for retry
      }
    } else {
      // Regular state update
      await updateCollabState(id, selectedStateToModify, reason, reasonText);
      setIsDialogOpen(false);
    }
  };

  const allStatesOptions = collabStates.allCollabStatesOptions.filter(
    (state) => {
      if (!state.type) {
        return true;
      }
      return state.type === collab.type;
    },
  );

  return (
    <ReusableStepperStyled className="stepper">
      <Box sx={{ maxWidth: 400 }}>
        <CollabsStateTimelineV2
          collab={collab}
          isCompany={user.type === "Company"}
        />
      </Box>
      {user.type !== "Company" && (
        /*collab.state?.id !== collabStates.COLAB_CANCELLED_STATE &&
        collab.state?.id !== collabStates.COLAB_REJECTED_STATE &&
        collab.state?.id !== collabStates.COLAB_SENT_STATE &&*/ <div
          className="stepper__btn-container"
          style={{ marginTop: "20px", display: "flex", gap: "20px" }}
        >
          <button
            className="stepper__state-btn"
            onClick={handleClick}
            type="button"
          >
            Acciones <MdOutlineHistory size={20} />
          </button>
          <ActionButton
            icon={<FaCheckCircle size={20} />}
            onClick={() =>
              handleActionSelected(collabStates.COLAB_PUBLISHED_STATE)
            }
            text="Marcar como publicado"
            color={theme.colors.softGreen}
          />
        </div>
      )}

      <CustomDropdownV2
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onClickFC={(selectedStateId) => {
          handleActionSelected(selectedStateId);
        }}
        options={allStatesOptions}
      />

      <DialogDeleteConfirm
        handleClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        onAccept={handleOnAccept}
        pageName={SectionTypes.collabs}
        sectionId={collab?.id}
        type={collabStateActionType}
        accept_state_id={
          collab.state?.id === collabStates.COLAB_PENDING_NOMADE_STATE
            ? collabStates.COLAB_PENDING_COMPANY_STATE
            : collabStates.COLAB_ACCEPTED_STATE
        }
      />
    </ReusableStepperStyled>
  );
}
