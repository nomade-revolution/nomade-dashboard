import * as collabStates from "sections/collabs/utils/collabsStates";
import { Template } from "./interfaces";

export const ERROR_STATES = [
  collabStates.COLAB_REJECTED_STATE,
  collabStates.COLAB_INCIDENT_STATE,
  collabStates.COLAB_CANCELLED_STATE,
];

export const DEFINED_NEXT_STEPS_TEMPLATE: Template = {
  [collabStates.COLAB_ACCEPTED_STATE]: {
    leftText: "",
    rightText: "Producto enviado",
  },
  [collabStates.COLAB_SENT_STATE]: {
    leftText: "",
    rightText: "Producto recibido",
  },
  [collabStates.COLAB_RECEIVED_STATE]: {
    leftText: "Publicación pendiente",
    rightText: "Contenido publicado",
    rightExtraText: "Fecha límite: ",
  },
};
