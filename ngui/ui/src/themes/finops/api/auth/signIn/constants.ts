export const LOGIN_CHALLENGE_STATE = Object.freeze({
  MFA_REQUIRED: "mfa_required",
  ENROLLMENT_REQUIRED: "enrollment_required"
} as const);

export const MFA_METHOD_TYPE = Object.freeze({
  TOTP: "totp",
  EMAIL: "email"
} as const);

/** Authentication methods `login_options` can offer for an address. `sso` joins them later. */
export const LOGIN_METHOD = Object.freeze({
  PASSWORD: "password"
} as const);

export const CREATE_TOKEN_STATUS = Object.freeze({
  TOKEN_ISSUED: 201,
  CHALLENGE_REQUIRED: 202
} as const);

export const AUTH_ERROR_CODE = Object.freeze({
  INVALID_CREDENTIALS: "OA0037",
  INTERNAL_ERROR: "OA0061",
  EMAIL_NOT_VERIFIED: "OA0073"
} as const);
