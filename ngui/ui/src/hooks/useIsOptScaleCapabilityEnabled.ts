import { OPTSCALE_CAPABILITY } from "utils/constants";
import { ObjectValues } from "utils/types";
import { useGetOptscaleCapability } from "./coreData/useGetOptscaleCapability";

type Capability = ObjectValues<typeof OPTSCALE_CAPABILITY>;

type CapabilityParameter = Capability | undefined;

export const useIsOptScaleCapabilityEnabled = (capability: CapabilityParameter) => {
  const { optscaleCapability } = useGetOptscaleCapability();

  if (!capability) {
    return true;
  }

  // Return true in two cases:
  // 1. When the capability exists in optscaleCapability and is enabled (true)
  // 2. When the capability doesn't exist in optscaleCapability (undefined), treating it as enabled
  return optscaleCapability?.[capability] ?? true;
};
