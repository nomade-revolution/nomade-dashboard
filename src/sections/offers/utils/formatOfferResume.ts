import { FullOffer, OfferTypes } from "modules/offers/domain/Offer";
import { Calendar } from "modules/offers/domain/OfferCalendar";

export const formatOfferResumeMultiple = (offer: FullOffer) => {
  const calendars: Calendar[] = Array.isArray(offer?.calendar)
    ? offer.calendar
    : [offer?.calendar];

  if (!calendars?.length) return [];

  // @ts-expect-error TODO fix this
  const result = [];
  calendars.forEach((calendar) => {
    const parsedCalendar = formatOfferCalendar(offer, calendar);
    if (parsedCalendar.length) {
      result.push(parsedCalendar[0]);
    }
  });
  // @ts-expect-error TODO fix this
  return result;
};

const formatOfferResume = (offer: FullOffer, selectedIndex?: number | null) => {
  const calendar: Calendar = Array.isArray(offer?.calendar)
    ? offer.calendar[selectedIndex || 0]
    : offer?.calendar;

  return formatOfferCalendar(offer, calendar);
};

const formatOfferCalendar = (offer: FullOffer, calendar: Calendar) => {
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

  // console.log("LA WEEK", calendar?.week, combinedWeek);

  switch (offer?.type) {
    case OfferTypes.restaurant:
    case OfferTypes.lodging:
    case OfferTypes.activity: {
      return [
        {
          type: offer.type,
          address_id: calendar.address_id,
          min_guests: calendar.min_guests,
          max_guests: calendar.max_guests,
          week: combinedWeek.map((daySlots) => ({
            day_of_week: daySlots[0].day_of_week,
            day_name: daySlots[0].day_name,
            time_slot: daySlots[0].time_slot,
          })),
        },
      ];
    }

    case OfferTypes.delivery: {
      return [
        {
          type: offer.type,
          advance_notice_time: offer.advance_notice_time,
          week: combinedWeek.map((daySlots) => ({
            day_of_week: daySlots[0].day_of_week,
            day_name: daySlots[0].day_name,
            time_slot: daySlots[0].time_slot,
          })),
        },
      ];
    }

    case OfferTypes.brand: {
      return [];
    }

    default:
      return [];
  }
};

export default formatOfferResume;
