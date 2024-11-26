import { OfferableBrand, FullOffer } from "modules/offers/domain/Offer";
import { Calendar } from "modules/offers/domain/OfferCalendar";

const formatOfferResume = (offer: FullOffer) => {
  const calendar: Calendar = Array.isArray(offer.calendar)
    ? offer.calendar[0]
    : offer.calendar;

  switch (offer.type) {
    case "Restaurant":
    case "Activity": {
      return calendar.week.map((week) =>
        week.map((slot) => ({
          address_id: calendar.address_id,
          min_guests: slot.min_guests,
          max_guests: slot.max_guests,
          week: [
            { day_of_week: slot.day_of_week, time_slot: [slot.time_slot] },
          ],
        })),
      );
    }

    case "Lodging": {
      return calendar.week.map((week) =>
        week.map((slot) => ({
          address_id: calendar.address_id,
          min_guests: slot.min_guests,
          max_guests: slot.max_guests,
        })),
      );
    }

    case "Delivery": {
      return {
        advance_notice_time: offer.advance_notice_time,
        week: calendar.week.map((day) =>
          day.map((slot) => ({
            day_of_week: slot.day_of_week,
            time_slot: [slot.time_slot],
          })),
        ),
      };
    }

    case "Brand": {
      return {} as OfferableBrand;
    }

    default:
      return [];
  }
};

export default formatOfferResume;
