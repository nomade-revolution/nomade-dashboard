import {
  OfferableActivity,
  OfferableBrand,
  OfferableDelivery,
  OfferableLodging,
  OfferableRestaurant,
  OfferFormStructure,
  OfferTypes,
} from "modules/offers/domain/Offer";
import { normalizeWeekData } from "sections/offers/utils/normalizeTimeFormat";

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
      "advance_notice_time",
    ];

    Object.entries(values).forEach(([key, value]) => {
      if (!excludedKeys.includes(key)) {
        formData.append(key, value as string);
      }
    });

    // Add advance_notice_time to offerable based on offer type
    let finalOfferable = offerable;

    // Handle Lodging offers (can have advance_notice_time and week is optional)
    if (offerable_type === "App\\Models\\OfferableLodging") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lodgingArray = offerable as unknown as any[];
      if (Array.isArray(lodgingArray) && lodgingArray.length > 0) {
        // Backend expects array for Lodging
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        finalOfferable = lodgingArray.map((item) => ({
          address_id: item.address_id,
          min_guests: item.min_guests || 0,
          max_guests: item.max_guests || 0,
          advance_notice_time:
            values.advance_notice_time !== undefined
              ? values.advance_notice_time
              : item.advance_notice_time || 0,
          // Week is optional for Lodging (backend auto-adds full week if not provided)
          ...(item.week && { week: normalizeWeekData(item.week) }),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })) as any;
      }
    } else if (values.advance_notice_time !== undefined) {
      if (offerable_type === "App\\Models\\OfferableBrand") {
        // For Brand offers: { "advance_notice_time": 150 }
        finalOfferable = {
          advance_notice_time: values.advance_notice_time,
        };
      } else if (offerable_type === "App\\Models\\OfferableDelivery") {
        // Extract the actual offerable data from the "0" index if it exists
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const actualOfferableData = (offerable as any)[0] || offerable;
        // For Delivery offers: Backend expects a single object (not array)
        // { "week": [...], "advance_notice_time": 150 }
        finalOfferable = {
          week: actualOfferableData.week
            ? normalizeWeekData(actualOfferableData.week)
            : [],
          advance_notice_time:
            values.advance_notice_time !== undefined
              ? values.advance_notice_time
              : actualOfferableData.advance_notice_time || 0,
        };
      } else if (
        offerable_type === "App\\Models\\OfferableRestaurant" ||
        offerable_type === "App\\Models\\OfferableActivity"
      ) {
        // For Restaurant and Activity offers: backend expects array of objects
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const offerableArray = offerable as unknown as any[];

        if (Array.isArray(offerableArray) && offerableArray.length > 0) {
          // Backend expects array of objects, each with advance_notice_time
          // Normalize week data to ensure proper time format (HH:mm:ss)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          finalOfferable = offerableArray.map((item) => ({
            address_id: item.address_id,
            min_guests: item.min_guests || 0,
            max_guests: item.max_guests || 0,
            week: item.week ? normalizeWeekData(item.week) : [],
            advance_notice_time:
              values.advance_notice_time !== undefined
                ? values.advance_notice_time
                : item.advance_notice_time || 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          })) as any;
        } else {
          // Handle case where offerable is not an array or empty
          finalOfferable = [
            {
              address_id: 0,
              min_guests: 0,
              max_guests: 0,
              week: [],
              advance_notice_time:
                values.advance_notice_time !== undefined
                  ? values.advance_notice_time
                  : 0,
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ] as any;
        }
      }
    }

    formData.append("offerable", JSON.stringify(finalOfferable));
    // IMPORTANT: Always send offerable_type to work around backend bug
    // Backend bug: If offerable_type is not provided, it fails when accessing $data['offerable_type']
    // This ensures the backend can process the update correctly
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
