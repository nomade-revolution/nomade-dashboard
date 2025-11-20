/**
 * Normalizes time string to HH:mm:ss format as required by backend
 * @param time - Time string in any format (HH:mm, HH:mm:ss, or empty)
 * @returns Time string in HH:mm:ss format, or empty string if input is empty
 */
export const normalizeTimeFormat = (time: string): string => {
  if (!time || time.trim() === "") {
    return "";
  }

  // Remove any whitespace
  const cleaned = time.trim();

  // Split by colon
  const parts = cleaned.split(":");

  // If already in HH:mm:ss format, return as is
  if (parts.length === 3) {
    return cleaned;
  }

  // If in HH:mm format, add :00
  if (parts.length === 2) {
    return `${cleaned}:00`;
  }

  // If only HH, add :00:00
  if (parts.length === 1 && parts[0]) {
    return `${cleaned}:00:00`;
  }

  return "";
};

interface TimeSlot {
  from_time: string;
  to_time: string;
}

interface WeekDay {
  day_of_week: number;
  time_slot: TimeSlot[];
}

/**
 * Normalizes week data to match backend expectations:
 * - Ensures time format is HH:mm:ss
 * - Removes day_name (not used by backend)
 * - Ensures time_slot is an array
 */
export const normalizeWeekData = (week: WeekDay[] | unknown[]): WeekDay[] => {
  if (!Array.isArray(week)) {
    return [];
  }

  return week.map((day) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dayData = day as any;
    const normalizedDay: WeekDay = {
      day_of_week: dayData.day_of_week,
      time_slot: [],
    };

    // Normalize time_slot array
    if (Array.isArray(dayData.time_slot)) {
      normalizedDay.time_slot = dayData.time_slot
        .filter((slot: TimeSlot) => slot.from_time && slot.to_time) // Remove empty slots
        .map((slot: TimeSlot) => ({
          from_time: normalizeTimeFormat(slot.from_time),
          to_time: normalizeTimeFormat(slot.to_time),
        }));
    } else if (dayData.time_slot) {
      // Handle single time_slot object
      normalizedDay.time_slot = [
        {
          from_time: normalizeTimeFormat(dayData.time_slot.from_time),
          to_time: normalizeTimeFormat(dayData.time_slot.to_time),
        },
      ];
    }

    return normalizedDay;
  });
};
