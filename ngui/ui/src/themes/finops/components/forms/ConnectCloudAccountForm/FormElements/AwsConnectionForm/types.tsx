import { ObjectValues } from "utils/types";
import { AUTHENTICATION_TYPES } from "./constants";

export type AuthenticationType = ObjectValues<typeof AUTHENTICATION_TYPES>;

export type AuthenticationTypeSelectorType = {
  authenticationType: string;
  setAuthenticationType: (type: AuthenticationType) => void;
};

export type AwsTypeDescriptionProps = {
  messageId: string;
  type?: "paragraph" | "warning";
  linkUrl?: string;
  linkDisplayBlock?: boolean;
};
