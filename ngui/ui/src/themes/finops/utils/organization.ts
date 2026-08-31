import { intl } from "translations/react-intl-config";
import { sliceByLimitWithEllipsis } from "./strings";

// Read per call, not at import time: a module-scope const captures whichever locale was active
// when this file first loaded, so switching language leaves the suffix stuck until refresh.
const inactiveSuffix = () => ` (${intl.formatMessage({ id: "terminated" })})`;

type GetOrganizationDisplayNameParams = {
  name: string;
  maxLength: number;
  isInactive?: boolean;
};

export const getOrganizationDisplayName = ({ name, isInactive = false, maxLength }: GetOrganizationDisplayNameParams) => {
  const suffix = isInactive ? inactiveSuffix() : "";
  const displayName = `${name}${suffix}`;
  const effectiveMaxLength = maxLength - suffix.length;

  const isNameLong = displayName.length > maxLength;
  return {
    displayName: isNameLong ? `${sliceByLimitWithEllipsis(name, effectiveMaxLength)}${suffix}` : displayName,
    isNameLong,
    originalName: name
  };
};
