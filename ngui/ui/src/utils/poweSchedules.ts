import { isPast, secondsToMilliseconds } from "utils/datetime";

export const isPowerScheduleExpired = (endDate: number) => endDate && isPast(secondsToMilliseconds(endDate));
