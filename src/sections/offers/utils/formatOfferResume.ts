import { FullOffer, OfferTypes } from "modules/offers/domain/Offer";
import { Calendar } from "modules/offers/domain/OfferCalendar";

const formatOfferResume = (offer: FullOffer) => {
  const calendar: Calendar = Array.isArray(offer?.calendar)
    ? offer.calendar[0]
    : offer?.calendar;

  const combinedWeek = calendar?.week.map((dayGroup) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dayMap: { [dayOfWeek: number]: any } = {};

    dayGroup.forEach((day) => {
      if (!dayMap[day.day_of_week]) {
        dayMap[day.day_of_week] = {
          ...day,
          time_slot: [day.time_slot],
        };
      } else {
        dayMap[day.day_of_week].time_slot.push(day.time_slot);
      }
    });

    return Object.values(dayMap);
  });

  switch (offer?.type) {
    case OfferTypes.restaurant:
    case OfferTypes.lodging:
    case OfferTypes.activity: {
      return combinedWeek.map((week) =>
        week.map((slot) => ({
          type: offer.type,
          address_id: calendar.address_id,
          min_guests: calendar.min_guests,
          max_guests: calendar.max_guests,
          week: [
            {
              day_of_week: slot.day_of_week,
              time_slot: slot.time_slot,
              day_name: slot.day_name,
            },
          ],
        })),
      );
    }

    case OfferTypes.delivery: {
      return combinedWeek.map((week) =>
        week.map((slot) => ({
          type: offer.type,
          advance_notice_time: offer.advance_notice_time,
          week: [
            {
              day_of_week: slot.day_of_week,
              time_slot: slot.time_slot,
              day_name: slot.day_name,
            },
          ],
        })),
      );
    }

    case OfferTypes.brand: {
      return [];
    }

    default:
      return [];
  }
};

export default formatOfferResume;
