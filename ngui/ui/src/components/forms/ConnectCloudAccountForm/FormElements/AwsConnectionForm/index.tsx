import { AwsConnectionAccessKeyInputs } from "./AwsConnectionAccessKeyInputs";
import {
  AUTHENTICATION_TYPES,
  authenticationTypes,
  awsConnectionAssumedRoleDescriptions,
  awsConnectionKeyAccessDescriptions,
  AWS_ROOT_INPUTS_FIELD_NAMES
} from "./AwsConnectionForm.constants";
import { AuthenticationType } from "./AwsConnectionForm.types";

export {
  AUTHENTICATION_TYPES,
  authenticationTypes,
  awsConnectionAssumedRoleDescriptions,
  awsConnectionKeyAccessDescriptions,
  AWS_ROOT_INPUTS_FIELD_NAMES,
  AwsConnectionAccessKeyInputs
};
export type { AuthenticationType };
export * from "./AwsConnectionForm.constants";
export * from "./AwsConnectionFormElements";
export * from "./AwsConnectionAccessKeyInputs";
