import { useFormatIntervalTimeAgo } from "./useFormatIntervalTimeAgo";

export const useIntervalTimeAgo = (agoSecondsTimestamp: number, precision?: number) => {
  const format = useFormatIntervalTimeAgo();

  return format(agoSecondsTimestamp, precision);
};
