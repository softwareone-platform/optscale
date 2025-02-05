import { useEffect, useState } from "react";
import { useGetOptscaleMode } from "./coreData";

export const useIsOptScaleModeEnabled = (mode) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const { optscaleMode } = useGetOptscaleMode();

  useEffect(() => {
    // This handles 2 cases, in both of them we need to display children.
    // 1. If there is no mode explicitly defined for a component
    // 2. if there is no OPTSCALE_MODE_OPTION defined at all
    setIsEnabled(optscaleMode?.[mode] ?? true);
  }, [optscaleMode, mode]);

  return isEnabled;
};
