export const AWS_ROOT_INPUTS_FIELD_NAMES = {
  IS_FIND_REPORT: "isFindReport",
  CONFIG_SCHEME: "configScheme"
};

export const FIELD_NAMES = Object.freeze({
  ACCESS_KEY_ID: "awsAccessKeyId",
  ASSUMED_ROLE_NAME: "AssumedRoleName"
});

export type WatcherType = { watch: (field: string, defaultValue?: unknown) => unknown };
