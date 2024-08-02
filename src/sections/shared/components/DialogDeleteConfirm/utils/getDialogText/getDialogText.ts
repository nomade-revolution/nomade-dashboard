import { SectionTypes } from "sections/shared/interfaces/interfaces";
import dialogTexts from "../dialogTexts";

const getDialogText = (pageName: string) => {
  return pageName === SectionTypes.collabs
    ? dialogTexts.desActivateProductFromDB
    : pageName === SectionTypes.offers
      ? dialogTexts.deleteProductFromCollection
      : pageName === SectionTypes.users
        ? dialogTexts.deleteNomadeUser
        : pageName === SectionTypes.customers
          ? dialogTexts.deleteBanner
          : pageName === SectionTypes.influencers
            ? dialogTexts.deleteCollection
            : "";
};

export default getDialogText;
