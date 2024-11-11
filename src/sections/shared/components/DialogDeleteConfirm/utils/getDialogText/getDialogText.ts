import { SectionTypes } from "sections/shared/interfaces/interfaces";
import dialogTexts from "../dialogTexts";
import { CollabActionTypes } from "modules/collabs/domain/Collabs";

const getDialogText = (pageName: string, type?: string) => {
  switch (pageName) {
    case SectionTypes.collabs:
      return type === CollabActionTypes.accept
        ? dialogTexts.acceptCollab
        : type === CollabActionTypes.refuse
          ? dialogTexts.refuseCollab
          : type === CollabActionTypes.cancel
            ? dialogTexts.cancelCollab
            : dialogTexts.deleteCollab;
    case SectionTypes.offers:
      return dialogTexts.deleteOffer;
    case SectionTypes.users:
      return dialogTexts.deleteNomadeUser;
    case SectionTypes.customers:
      return dialogTexts.deleteCompany;
    case SectionTypes.influencers:
      return dialogTexts.deleteInfluencer;
    default:
      return "";
  }
};

export default getDialogText;
