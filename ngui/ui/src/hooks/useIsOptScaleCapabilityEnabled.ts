import { useEffect, useState } from "react";
import { useGetOptscaleCapability } from "./coreData";

type Capability = "finops" | "mlops";

export const useIsOptScaleCapabilityEnabled = (capability: Capability) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const { optscaleCapability } = useGetOptscaleCapability();

  useEffect(() => {
    // This handles 2 cases, in both of them we need to display children.
    // 1. If there is no capability explicitly defined for a component
    // 2. if there is no OPTSCALE_CAPABILITY defined at all
    setIsEnabled(optscaleCapability?.[capability] ?? true);
  }, [optscaleCapability, capability]);

  return isEnabled;
};
