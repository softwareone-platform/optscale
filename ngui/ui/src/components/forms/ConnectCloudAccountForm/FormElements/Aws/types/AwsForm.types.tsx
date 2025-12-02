import { ObjectValues } from "utils/types";
import { AUTHENTICATION_TYPES } from "../constants/AwsConstants";

export type AuthenticationType = ObjectValues<typeof AUTHENTICATION_TYPES>;

export type AuthenticationTypeSelectorType = {
  authenticationType: string;
  setAuthenticationType: (type: AuthenticationType) => void;
};
