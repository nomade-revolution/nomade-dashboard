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
    case "Activity": {
      return (
        offerSchedule! as OfferableRestaurant[] | OfferableActivity[]
      ).map((week) =>
        week.week.map((slot) => ({
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

    case "Lodging": {
      return [
        {
          address_id: (offerSchedule! as OfferableLodging).address_id,
          min_guests: (offerSchedule! as OfferableLodging).min_guests,
          max_guests: (offerSchedule! as OfferableLodging).max_guests,
        },
      ];
    }

    case "Delivery": {
      return (offerSchedule! as OfferableDelivery[]).map((week) =>
        week.week.map((slot) => ({
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
