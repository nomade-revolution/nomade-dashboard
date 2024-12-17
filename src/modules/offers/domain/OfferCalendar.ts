export interface TimeSlotOffer {
  day_of_week: number;
  day_name: string;
  time_slots: TimeSlotOffer[];
  time_slot: {
    from_time: string;
    to_time: string;
  };
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
