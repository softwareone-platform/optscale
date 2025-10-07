import { ObjectValues } from "utils/types";
import { ConnectionType } from "../../../ConnectCloudAccountForm";
import { AUTHENTICATION_TYPES } from "../constants/AwsConstants";

export type AwsWatcherType = { watch: (field: string, defaultValue?: unknown) => unknown };

export type AuthenticationType = ObjectValues<typeof AUTHENTICATION_TYPES>;

export interface FormAwsAssumeRoleExtendedProps {
  authenticationType: AuthenticationType | null;
  connectionType: ConnectionType;
}

export type AuthenticationTypeSelectorType = {
  authenticationType: string;
  setAuthenticationType: (type: AuthenticationType) => void;
};
