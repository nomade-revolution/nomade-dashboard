import { CollabType, CollabTypes } from "modules/collabs/domain/Collabs";
import { BsSendCheckFill } from "react-icons/bs";
import { FaCheckDouble } from "react-icons/fa6";
import {
  MdDoNotDisturbOn,
  MdNotInterested,
  MdOutlinePendingActions,
} from "react-icons/md";

export const COLAB_PENDING_NOMADE_STATE = 1; // nomade
export const COLAB_PENDING_COMPANY_STATE = 2; // nomade
export const COLAB_ACCEPTED_STATE = 3; // company
export const COLAB_MODIFICATION_IN_PROGRESS_STATE = 4; // influencer
export const COLAB_DONE_STATE = 5; // not used
export const COLAB_FINISHED_STATE = 6; // not used
export const COLAB_CANCELLED_STATE = 7; // company
export const COLAB_REJECTED_STATE = 8; // company - rejectedReason
export const COLAB_SENT_STATE = 9; // company
export const COLAB_RECEIVED_STATE = 10; // influencer
export const COLAB_INCIDENT_STATE = 11; // influencer
export const COLAB_PUBLISHED_STATE = 12; // influencer

export const getCollabStates = (state_id: number, type: string) => {
  const collabStates = [
    {
      id: COLAB_ACCEPTED_STATE,
      name: "Aceptar",
      type: CollabType.company,
      icon: FaCheckDouble,
      isVisible: state_id === COLAB_PENDING_COMPANY_STATE,
    },
    {
      id: COLAB_CANCELLED_STATE,
      name: "Cancelar ",
      type: CollabType.company,
      icon: MdDoNotDisturbOn,
      isVisible: state_id === COLAB_ACCEPTED_STATE,
    },
    {
      id: COLAB_REJECTED_STATE,
      name: "Rechazar ",
      type: CollabType.company,
      icon: MdNotInterested,
      isVisible:
        state_id === COLAB_ACCEPTED_STATE ||
        state_id === COLAB_PENDING_COMPANY_STATE,
    },
    {
      id: COLAB_SENT_STATE,
      name: "Enviado",
      type: CollabType.company,
      icon: BsSendCheckFill,
      isVisible:
        type === CollabTypes.brand && state_id === COLAB_ACCEPTED_STATE,
    },
    {
      id: COLAB_PENDING_COMPANY_STATE,
      name: "Pendiente de aceptación (empresa)",
      type: CollabType.nomade,
      icon: MdOutlinePendingActions,
      isVisible: true,
    },
  ];

  return collabStates;
};
