import {
  OfferableActivity,
  OfferableDelivery,
  OfferableLodging,
  OfferableRestaurant,
} from "modules/offers/domain/Offer";

const formatOfferScheduling = (schedulingState: {
  restaurant: OfferableRestaurant[];
  delivery: OfferableDelivery;
  activity: OfferableActivity[];
  brand: object;
  lodging: OfferableLodging[];
}) => {
  const offerSchedule = Object.values(schedulingState).find((state) => {
    return Array.isArray(state) && state.length > 0;
  });

  switch (
    offerSchedule &&
    (
      offerSchedule! as
        | OfferableRestaurant[]
        | OfferableActivity[]
        | OfferableActivity[]
    )[0].type
  ) {
    case "Restaurant":
    case "Lodging":
    case "Delivery":
    case "Activity": {
      return (
        offerSchedule! as OfferableRestaurant[] | OfferableActivity[]
      ).map((week) =>
        week.week.map((slot) => ({
          // @ts-expect-error TODO: fix this
          day_number: slot.day_of_week,
          // @ts-expect-error TODO: fix this
          day_name: slot.day_name,
          shifts: {
            firstShift: {
              // @ts-expect-error TODO: fix this
              from_time: slot.time_slot[0]?.from_time,
              // @ts-expect-error TODO: fix this
              to_time: slot.time_slot[0]?.to_time,
            },
            secondShift: {
              // @ts-expect-error TODO: fix this
              from_time: slot.time_slot[1]?.from_time,
              // @ts-expect-error TODO: fix this
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
