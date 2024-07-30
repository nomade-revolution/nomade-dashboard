export interface TimeSlot {
  day_of_week: number;
  day_name: string;
  time_slots: string[];
  min_guests: number;
  max_guests: number;
}

export interface Calendar {
  address_id: number;
  address: string;
  week: Array<TimeSlot[]>;
}
export interface CalendarWithWeeks {
  week: Array<TimeSlot[]>;
}
