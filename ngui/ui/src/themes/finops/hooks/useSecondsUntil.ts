import { useEffect, useState } from "react";
import { getCurrentUTCTimeInSec } from "utils/datetime";

/** Seconds left until a unix timestamp, ticking once a second and stopping at 0. */
export const useSecondsUntil = (unixSeconds: number) => {
  const [now, setNow] = useState(getCurrentUTCTimeInSec);

  useEffect(() => {
    const interval = setInterval(() => setNow(getCurrentUTCTimeInSec()), 1000);

    return () => clearInterval(interval);
  }, []);

  return Math.max(0, unixSeconds - now);
};
