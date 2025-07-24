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
            const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
            startDate = lastMonth;
            endDate.setFullYear(lastMonth.getFullYear());
            endDate.setMonth(lastMonth.getMonth() + 1);
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
            ...(yearsDiffer ? { year: 'numeric' } : {}),
            timeZone: 'UTC',
        });

    return `${format(startDate)} - ${format(endDate)}`;
}
