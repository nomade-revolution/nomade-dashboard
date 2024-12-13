import { useNavigate } from "react-router-dom";
import * as collabStates from "../../../collabs/utils/collabsStates";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";

import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import { Collab, CollabActionTypes } from "modules/collabs/domain/Collabs";

const useActions = () => {
  const { sendLinkForLead } = useLeadsContext();
  const { updateCollabState } = useCollabsContext();
  const navigate = useNavigate();

  const handleIsDialogOpen = (setter: (value: boolean) => void) => {
    setter(true);
  };

  const handleIsDialogClosed = (setter: (value: boolean) => void) => {
    setter(false);
  };

  const handleSendLeadLink = async (section_id: number) => {
    await sendLinkForLead(section_id);
    navigate(0);
  };

  const acceptCollab = async (collabId: number, state_id: number) => {
    await updateCollabState(collabId, state_id);
    setTimeout(() => navigate(0), 1500);
  };

  const rejectCollab = async (
    collabId: number,
    rejected_collab_reason_id: number,
  ) => {
    await updateCollabState(
      collabId,
      collabStates.COLAB_REJECTED_STATE,
      rejected_collab_reason_id,
    );

    setTimeout(() => navigate(0), 1500);
  };

  const cancelCollab = async (collabId: number) => {
    await updateCollabState(collabId, collabStates.COLAB_CANCELLED_STATE);
    setTimeout(() => navigate(0), 1500);
  };

  const handleCollabStateUpdate = async (
    state_id: number,
    setIsDialogOpen: (value: boolean) => void,
    setCollabStateActionType: (value: CollabActionTypes) => void,
    section: Collab,
    type?: "detail" | "",
  ) => {
    if (collabStates.COLAB_REJECTED_STATE === state_id) {
      setIsDialogOpen(true);
      setCollabStateActionType!(CollabActionTypes.refuse);
      return;
    }
    await updateCollabState(section.id, state_id);

    type === "detail" && setTimeout(() => navigate(0), 1000);
  };

  return {
    handleIsDialogOpen,
    handleIsDialogClosed,
    acceptCollab,
    rejectCollab,
    handleSendLeadLink,
    handleCollabStateUpdate,
    cancelCollab,
  };
};

export default useActions;
