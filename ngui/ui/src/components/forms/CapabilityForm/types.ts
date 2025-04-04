import { OPTSCALE_CAPABILITY } from "utils/constants";
import { ObjectValues } from "utils/types";
import { FIELD_NAMES } from "./constants";

export type FormValues = {
  [FIELD_NAMES.CAPABILITY]: {
    [FIELD_NAMES.CAPABILITY_ML]: boolean;
    [FIELD_NAMES.CAPABILITY_FIN]: boolean;
  };
};

export type Option = Record<ObjectValues<typeof OPTSCALE_CAPABILITY>, boolean>;

export type CapabilityFormProps = {
  option: Option;
  onApply: (capability: CapabilityFormProps["option"]) => void;
  isLoading?: boolean;
  isApplyAllowed?: boolean;
};
