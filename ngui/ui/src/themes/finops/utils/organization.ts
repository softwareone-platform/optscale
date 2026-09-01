import { intl } from "translations/react-intl-config";
import { sliceByLimitWithEllipsis } from "./strings";

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
