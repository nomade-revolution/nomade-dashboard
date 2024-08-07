import { useNavigate } from "react-router-dom";
import * as collabStates from "../../../collabs/utils/collabsStates";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";

const useActions = () => {
  const { updateCollabState } = useCollabsContext();
  const navigate = useNavigate();

  const handleIsDialogOpen = (setter: (value: boolean) => void) => {
    setter(true);
  };

  const handleIsDialogClosed = (setter: (value: boolean) => void) => {
    setter(false);
  };

  const acceptCollab = async (collabId: number) => {
    await updateCollabState(collabId, collabStates.COLAB_PENDING_COMPANY_STATE);
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

  return {
    handleIsDialogOpen,
    handleIsDialogClosed,
    acceptCollab,
    rejectCollab,
  };
};

export default useActions;
