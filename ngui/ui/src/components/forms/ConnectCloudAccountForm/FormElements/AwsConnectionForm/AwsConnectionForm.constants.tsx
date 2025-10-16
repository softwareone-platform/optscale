import { AWS_CNR } from "utils/constants";

export const AUTHENTICATION_TYPES = Object.freeze({
  ASSUMED_ROLE: "assumedRole",
  ACCESS_KEY: "accessKey"
});

export const authenticationTypes = [
  {
    authenticationType: AUTHENTICATION_TYPES.ASSUMED_ROLE,
    messageId: "assumedRole",
    cloudType: AWS_CNR
  },
  { authenticationType: AUTHENTICATION_TYPES.ACCESS_KEY, messageId: "accessKey", cloudType: AWS_CNR }
];
