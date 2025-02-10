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

export const allCollabStatesOptions = [
  {
    name: "Pendiente de aceptación (nomade)",
    id: COLAB_PENDING_NOMADE_STATE,
  },
  {
    name: "Pendiente de aceptación (empresa)",
    id: COLAB_PENDING_COMPANY_STATE,
  },
  { name: "Aceptar", id: COLAB_ACCEPTED_STATE },
  {
    name: "Modificación en progreso",
    id: COLAB_MODIFICATION_IN_PROGRESS_STATE,
  },
  // {name: "Hecha", id: COLAB_DONE_STATE},
  { name: "Finalizar", id: COLAB_FINISHED_STATE },
  { name: "Cancelar", id: COLAB_CANCELLED_STATE },
  { name: "Rechazar", id: COLAB_REJECTED_STATE },
  {
    name: "Producto enviado/entregado",
    id: COLAB_SENT_STATE,
    type: CollabTypes.brand,
  },
  {
    name: "Producto recibido (todo ok)",
    id: COLAB_RECEIVED_STATE,
    type: CollabTypes.brand,
  },
  // { name: "Incidencia", id: COLAB_INCIDENT_STATE },
  { name: "Marcar como publicada", id: COLAB_PUBLISHED_STATE },
];

export const collabsFiltersCompany = [
  {
    id: COLAB_ACCEPTED_STATE,
    name: "Aceptado",
    value: "3",
  },
  {
    id: COLAB_CANCELLED_STATE,
    name: "Cancelado",
    value: "7",
  },

  {
    id: COLAB_REJECTED_STATE,
    name: "Rechazado",
    value: "8",
  },
  {
    id: COLAB_SENT_STATE,
    name: "Enviado",
    value: "9",
  },
];

export const collabsFiltersNomade = [
  {
    id: COLAB_PENDING_NOMADE_STATE,
    name: "Pendiente (Nomade)",
    value: "1",
  },
  {
    id: COLAB_PENDING_COMPANY_STATE,
    name: "Pendiente (Empresa)",
    value: "2",
  },
  {
    id: COLAB_ACCEPTED_STATE,
    name: "Aceptado (Empresa)",
    value: "3",
  },
  {
    id: COLAB_MODIFICATION_IN_PROGRESS_STATE,
    name: "Modificación en curso (Influencer)",
    value: "4",
  },
  // {
  //   id: COLAB_DONE_STATE,
  //   name: "Completado",
  //   value: "5",
  // },
  // {
  //   id: COLAB_FINISHED_STATE,
  //   name: "Finalizado",
  //   value: "6",
  // },
  {
    id: COLAB_CANCELLED_STATE,
    name: "Cancelado (Empresa)",
    value: "7",
  },

  {
    id: COLAB_REJECTED_STATE,
    name: "No aceptada (Empresa)",
    value: "8",
  },
  {
    id: COLAB_SENT_STATE,
    name: "Enviado",
    value: "9",
  },
  {
    id: COLAB_RECEIVED_STATE,
    name: "Recibido (Influencer)",
    value: "10",
  },
  {
    id: COLAB_INCIDENT_STATE,
    name: "Incidencia (Influencer)",
    value: "11",
  },
  {
    id: COLAB_PUBLISHED_STATE,
    name: "Publicado (Influencer)",
    value: "12",
  },
];
