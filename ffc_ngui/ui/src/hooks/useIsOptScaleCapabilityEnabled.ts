import { OPTSCALE_CAPABILITY } from "utils/constants";
import { ObjectValues } from "utils/types";
import { useIsMlopsEnabled } from "./useIsMlopsEnabled";

type Capability = ObjectValues<typeof OPTSCALE_CAPABILITY>;

type CapabilityParameter = Capability | undefined;

export const useIsOptScaleCapabilityEnabled = (capability: CapabilityParameter) => {
  const isMlopsEnabled = useIsMlopsEnabled();

  if (capability === OPTSCALE_CAPABILITY.MLOPS && !isMlopsEnabled) {
    return false;
  }

  return true;
};
