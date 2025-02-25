import { type ReactNode } from "react";
import { useIsOptScaleCapabilityEnabled } from "hooks/useIsOptScaleCapabilityEnabled";
import { OPTSCALE_CAPABILITY } from "utils/constants";

type CapabilityWrapperProps = {
  children: ReactNode;
  capability: (typeof OPTSCALE_CAPABILITY)[keyof typeof OPTSCALE_CAPABILITY];
};

const CapabilityWrapper = ({ children, capability }: CapabilityWrapperProps) => {
  const isCapabilityEnabled = useIsOptScaleCapabilityEnabled(capability);

  return isCapabilityEnabled ? children : null;
};

export default CapabilityWrapper;
