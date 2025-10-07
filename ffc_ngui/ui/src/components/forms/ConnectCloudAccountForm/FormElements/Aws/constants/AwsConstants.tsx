import { AWS_CNR } from "utils/constants";

export const AWS_ASSUMED_ROLE_FIELD_NAMES = Object.freeze({
  ACCOUNT_ID: "awsAccountId",
  ASSUMED_ROLE_NAME: "AssumedRoleName"
});

export const AWS_ACCESS_KEY_FIELD_NAMES = Object.freeze({
  ACCESS_KEY_ID: "awsAccessKeyId",
  AWS_SECRET_ACCESS_KEY: "awsSecretAccessKey"
});

export const AUTHENTICATION_TYPES = Object.freeze({
  ASSUMED_ROLE: "assumedRole",
  ACCESS_KEY: "accessKey"
});

export const AWS_ROOT_INPUTS_FIELD_NAMES = {
  IS_FIND_REPORT: "isFindReport",
  CONFIG_SCHEME: "configScheme"
};

export const authenticationTypes = [
  {
    authenticationType: AUTHENTICATION_TYPES.ASSUMED_ROLE,
    messageId: "assumedRole",
    cloudType: AWS_CNR
  },
  { authenticationType: AUTHENTICATION_TYPES.ACCESS_KEY, messageId: "accessKey", cloudType: AWS_CNR }
];
