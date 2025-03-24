import {
  OfferableActivity,
  OfferableBrand,
  OfferableDelivery,
  OfferableLodging,
  OfferableRestaurant,
  OfferFormStructure,
  OfferTypes,
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
    categories: number[],
  ) => {
    const formData = new FormData();

    const excludedKeys = [
      "offerable",
      "offerable_type",
      "offer_categories",
      "calendar",
      "location_type",
      "location_id",
      "active",
      "company_id",
      "categories",
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
    categories.forEach((category, index) => {
      formData.append(`offer_categories[${index}]`, String(category));
    });

    images.forEach((image) => formData.append("images[]", image));

    return formData;
  };

  const getSchedulingStateField = (
    schedulingState: {
      restaurant: OfferableRestaurant[];
      delivery: OfferableDelivery;
      activity: OfferableActivity[];
      brand: object;
      lodging: OfferableLodging[];
    },
    type: OfferTypes | string,
  ) => {
    switch (type) {
      case OfferTypes.restaurant:
        return schedulingState.restaurant;
      case OfferTypes.delivery:
        return schedulingState.delivery;
      case OfferTypes.activity:
        return schedulingState.activity;
      case OfferTypes.lodging:
        return schedulingState.lodging;
      default:
        return schedulingState.brand;
    }
  };

  return { handleOfferFormData, getSchedulingStateField };
};

export default useOffers;
