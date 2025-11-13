import { AwsConnectionAccessKeyInputs } from "./AwsConnectionAccessKeyInputs";
import {
  AUTHENTICATION_TYPES,
  authenticationTypes,
  awsConnectionAssumedRoleDescriptions,
  awsConnectionKeyAccessDescriptions,
  AWS_ROOT_INPUTS_FIELD_NAMES
} from "./constants";
import { AuthenticationType } from "./types";

export {
  AUTHENTICATION_TYPES,
  authenticationTypes,
  awsConnectionAssumedRoleDescriptions,
  awsConnectionKeyAccessDescriptions,
  AWS_ROOT_INPUTS_FIELD_NAMES,
  AwsConnectionAccessKeyInputs
};
export type { AuthenticationType };
export * from "./constants";
export * from "./AwsConnectionFormElements";
export * from "./AwsConnectionAccessKeyInputs";
