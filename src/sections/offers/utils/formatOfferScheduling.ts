import {
  OfferableActivity,
  OfferableDelivery,
  OfferableLodging,
  OfferableRestaurant,
  OfferTypes,
  SelectedDay,
} from "modules/offers/domain/Offer";

type InputData =
  | OfferableRestaurant[]
  | OfferableActivity[]
  | OfferableLodging[]
  | OfferableDelivery[];

const formatOfferScheduling = (
  offerSchedule: InputData,
  type: OfferTypes,
): SelectedDay[] => {
  if (type === OfferTypes.brand || !offerSchedule) return [];

  switch (type) {
    case "Restaurant":
    case "Lodging":
    case "Delivery":
    case "Activity": {
      return offerSchedule.map(
        (week) =>
          // @ts-expect-error TODO fix this
          week?.week?.map((slot) => ({
            day_number: slot.day_of_week,
            day_name: slot.day_name,
            shifts: {
              firstShift: {
                from_time: slot.time_slot[0]?.from_time,
                to_time: slot.time_slot[0]?.to_time,
              },
              secondShift: {
                from_time: slot.time_slot[1]?.from_time,
                to_time: slot.time_slot[1]?.to_time,
              },
            },
          })),
      );
    }

    default:
      return [];
  }
};

export default formatOfferScheduling;
