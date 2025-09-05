/**
 * Get formatted date range string for a given picker option.
 *
 * Adds year if start and end dates are in different years.
 *
 * @param rangeType - e.g. 'Last 7 days', 'This Month', etc.
 * @param today - Optional anchor date (for testing/stability).
 * @param customStart - Required for 'Custom' range.
 * @param customEnd - Required for 'Custom' range.
 * @returns A string like "Jul 01 - Jul 23" or "Jul 24, 2024 - Jul 23, 2025"
 */
export function getExpectedDateRangeText(
  rangeType: string,
  today: Date = new Date(),
  customStart?: Date,
  customEnd?: Date
): string {
  const endDate = new Date(today);
  let startDate: Date;

  switch (rangeType.toLowerCase()) {
    case 'last 7 days':
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 6);
      break;

    case 'last 30 days':
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 29);
      break;

    case 'this month':
      startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
      break;

    case 'last month':
      const lastMonthYear = endDate.getFullYear();
      const lastMonthIndex = endDate.getMonth() - 1;
      startDate = new Date(lastMonthYear, lastMonthIndex, 1);
      endDate.setFullYear(lastMonthYear);
      endDate.setMonth(lastMonthIndex + 1);
      endDate.setDate(0); // last day of last month
      break;

    case 'custom':
      if (!customStart || !customEnd) {
        throw new Error('Custom range requires start and end dates');
      }
      startDate = customStart;
      endDate.setTime(customEnd.getTime());
      break;

    default:
      throw new Error(`Unsupported range type: ${rangeType}`);
  }

  const yearsDiffer = startDate.getFullYear() !== endDate.getFullYear();

  const format = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      ...(yearsDiffer ? {year: 'numeric'} : {}),
      timeZone: 'UTC',
    });

  return `${format(startDate)} - ${format(endDate)}`;
}

/**
 * Calculates the Unix timestamp range for the last 7 days.
 * This function determines the start and end timestamps (in seconds) for the last 7 days,
 * with the end date being midnight (UTC) of the current day.
 *
 * @returns {{ startDate: number, endDate: number }} An object containing the start and end timestamps in seconds.
 * - `startDate`: The Unix timestamp for the start of the range (00:00:00 UTC, 6 days before today).
 * - `endDate`: The Unix timestamp for the end of the range (23:59:59 UTC, today).
 */
export function getLast7DaysUnixRange(): { startDate: number; endDate: number } {
  const today = new Date();

  // Midnight today (UTC)
  const endUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59));

  // 6 full days before today
  const startUTC = new Date(endUTC);
  startUTC.setUTCDate(endUTC.getUTCDate() - 6);
  startUTC.setUTCHours(0, 0, 0, 0); // force 00:00:00

  return {
    startDate: Math.floor(startUTC.getTime() / 1000),  // e.g. 2025-07-19 00:00:00
    endDate: Math.floor(endUTC.getTime() / 1000),      // e.g. 2025-07-25 23:59:59
  };
}

/**
 * Calculates the Unix timestamp range for the last 30 days.
 * This function determines the start and end timestamps (in seconds) for the last 30 days,
 * with the end date being midnight (UTC) of the current day.
 *
 * @returns {{ startDate: number, endDate: number }} An object containing the start and end timestamps in seconds.
 * - `startDate`: The Unix timestamp for the start of the range (00:00:00 UTC, 29 days before today).
 * - `endDate`: The Unix timestamp for the end of the range (23:59:59 UTC, today).
 */
export function getLast30DaysUnixRange(): { startDate: number; endDate: number } {
  const today = new Date();

  // Midnight today (UTC)
  const endUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59));

  // 29 full days before today
  const startUTC = new Date(endUTC);
  startUTC.setUTCDate(endUTC.getUTCDate() - 29);
  startUTC.setUTCHours(0, 0, 0, 0); // force 00:00:00

  return {
    startDate: Math.floor(startUTC.getTime() / 1000),
    endDate: Math.floor(endUTC.getTime() / 1000),
  };
}

/**
 * Calculates the Unix timestamp range for the previous calendar month.
 * This function determines the start and end timestamps (in seconds) for the last full month,
 * with the start date being midnight (UTC) on the first day of the previous month,
 * and the end date being 23:59:59 UTC on the last day of the previous month.
 *
 * @returns {{ startDate: number, endDate: number }} An object containing the start and end timestamps in seconds.
 * - `startDate`: The Unix timestamp for the start of the previous month (00:00:00 UTC).
 * - `endDate`: The Unix timestamp for the end of the previous month (23:59:59 UTC).
 */
export function getLastMonthUnixDateRange(): { startDate: number; endDate: number } {
  const today = new Date();

  // Get the previous month and year
  const prevMonth = today.getUTCMonth() - 1;
  const year = prevMonth < 0 ? today.getUTCFullYear() - 1 : today.getUTCFullYear();
  const month = (prevMonth + 12) % 12;

  // Start of the previous month (UTC)
  const startUTC = new Date(Date.UTC(year, month, 1, 0, 0, 0));

  // End of the previous month (UTC)
  const endUTC = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59)); // day 0 of next month = last day of prev month

  return {
    startDate: Math.floor(startUTC.getTime() / 1000),
    endDate: Math.floor(endUTC.getTime() / 1000),
  };
}

/**
 * Converts a Unix timestamp to a date string in the format `yyyy-mm-dd`.
 *
 * @param {number} unix - The Unix timestamp (in seconds) to convert.
 * @returns {string} The formatted date string in `yyyy-mm-dd` format.
 */
export function unixToDateString(unix: number): string {
  return new Date(unix * 1000).toISOString().split('T')[0]; // yyyy-mm-dd
}
