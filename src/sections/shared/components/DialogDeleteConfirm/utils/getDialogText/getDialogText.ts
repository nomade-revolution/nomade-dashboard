import { SectionTypes } from "sections/shared/interfaces/interfaces";
import dialogTexts from "../dialogTexts";
import { CollabActionTypes } from "modules/collabs/domain/Collabs";

const getDialogText = (pageName: string, type?: string) => {
  switch (pageName) {
    case SectionTypes.categories:
      return dialogTexts.deleteCategory;
    case SectionTypes.collabs:
      if (type === "modifyState") {
        return dialogTexts.modifyCollabState;
      }
      if (type === "modifyStateWithNotes") {
        return dialogTexts.modifyCollabStateWithNotes;
      }
      if (type === CollabActionTypes.accept) {
        return dialogTexts.acceptCollab;
      }
      if (type === CollabActionTypes.refuse) {
        return dialogTexts.refuseCollab;
      }
      if (type === CollabActionTypes.cancel) {
        return dialogTexts.cancelCollab;
      }
      if (type === CollabActionTypes.sendPackage) {
        return dialogTexts.sendPackageCollab;
      }
      return dialogTexts.deleteCollab;
    case SectionTypes.offers:
      return dialogTexts.deleteOffer;
    case SectionTypes.users:
      return dialogTexts.deleteNomadeUser;
    case SectionTypes.customers:
      return dialogTexts.deleteCompany;
    case SectionTypes.usersApp:
      if (type === "modifyState") {
        return dialogTexts.modifyUserState;
      }
      return dialogTexts.deleteNomadeUser;
    case SectionTypes.influencers:
      if (type === "modifyState") {
        return dialogTexts.modifyInfluencerState;
      }
      return dialogTexts.deleteInfluencer;
    default:
      return "";
  }
};

export default getDialogText;
