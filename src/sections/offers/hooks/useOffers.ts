import {
  OfferableActivity,
  OfferableBrand,
  OfferableDelivery,
  OfferableLodging,
  OfferableRestaurant,
  OfferFormStructure,
} from "modules/offers/domain/Offer";

const useOffers = () => {
  const handleOfferFormData = (
    values: OfferFormStructure,
    offerable:
      | OfferableRestaurant
      | OfferableLodging
      | OfferableBrand
      | OfferableActivity
      | OfferableDelivery,
    offerable_type: string,
    location_type: string,
    location_id: number,
    active: boolean,
    company_id: number,
    images: File[],
    offer_category_id: number,
  ) => {
    const formData = new FormData();

    const excludedKeys = [
      "offerable",
      "offerable_type",
      "location_type",
      "location_id",
      "active",
      "company_id",
      "offer_category_id",
      "images",
    ];

    Object.entries(values).forEach(([key, value]) => {
      if (!excludedKeys.includes(key)) {
        formData.append(key, value as string);
      }
    });

    formData.append("offerable", JSON.stringify(offerable));
    formData.append("offerable_type", offerable_type);
    formData.append("location_type", location_type);
    formData.append("location_id", JSON.stringify(location_id));
    formData.append("active", JSON.stringify(active));
    formData.append("company_id", JSON.stringify(company_id));
    formData.append("offer_category_id", JSON.stringify(offer_category_id));

    images.forEach((image) => formData.append("images[]", image));

    return formData;
  };
  return { handleOfferFormData };
};

export default useOffers;
