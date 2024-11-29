import { TimeSlot } from "./Offer";

export interface TimeSlotOffer {
  day_of_week: number;
  day_name: string;
  time_slots: string[];
  time_slot: TimeSlot[];
}

export interface Calendar {
  min_guests: number;
  max_guests: number;
  address_id: number;
  address: string;
  week: Array<TimeSlotOffer[]>;
}
export interface CalendarWithWeeks {
  week: Array<TimeSlotOffer[]>;
}
