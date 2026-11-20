/** `m:ss`, the way a countdown reads. */
export const formatCountdown = (totalSeconds: number) =>
  `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
