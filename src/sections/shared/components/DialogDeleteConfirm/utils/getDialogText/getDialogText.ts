import { SectionTypes } from "sections/shared/interfaces/interfaces";
import dialogTexts from "../dialogTexts";

const getDialogText = (pageName: string) => {
  return pageName === SectionTypes.collabs
    ? dialogTexts.deleteCollab
    : pageName === SectionTypes.offers
      ? dialogTexts.deleteOffer
      : pageName === SectionTypes.users
        ? dialogTexts.deleteNomadeUser
        : pageName === SectionTypes.customers
          ? dialogTexts.deleteCompany
          : pageName === SectionTypes.influencers
            ? dialogTexts.deleteInfluencer
            : "";
};

export default getDialogText;
