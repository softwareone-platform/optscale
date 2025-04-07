import { type ReactNode } from "react";
import { useIsOptScaleCapabilityEnabled } from "hooks/useIsOptScaleCapabilityEnabled";
import { OPTSCALE_CAPABILITY } from "utils/constants";
import { ObjectValues } from "utils/types";

type CapabilityWrapperProps = {
  children: ReactNode;
  capability: ObjectValues<typeof OPTSCALE_CAPABILITY>;
};

const CapabilityWrapper = ({ children, capability }: CapabilityWrapperProps) => {
  const isCapabilityEnabled = useIsOptScaleCapabilityEnabled(capability);

  return isCapabilityEnabled ? children : null;
};

export default CapabilityWrapper;
