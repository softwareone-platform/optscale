import { OPTSCALE_CAPABILITY } from "utils/constants";
import { FIELD_NAMES } from "./constants";
import { FormValues, Option } from "./types";

export const getDefaultValues = (option: Option): FormValues => ({
  [FIELD_NAMES.CAPABILITY]: {
    [FIELD_NAMES.CAPABILITY_ML]: option?.[OPTSCALE_CAPABILITY.MLOPS] ?? true,
    [FIELD_NAMES.CAPABILITY_FIN]: option?.[OPTSCALE_CAPABILITY.FINOPS] ?? true
  }
});
