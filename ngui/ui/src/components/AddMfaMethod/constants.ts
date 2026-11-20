export const ADD_MFA_METHOD_STEP = Object.freeze({
  CHOOSE: "choose",
  AUTHENTICATOR_APP: "authenticator_app",
  EMAIL_CODE: "email_code"
} as const);

/** What went wrong with an enrollment, sorted by what the user can do next. */
export const ENROLLMENT_FAILURE = Object.freeze({
  INVALID_CODE: "invalid_code",
  EXPIRED: "expired",
  ALREADY_SET_UP: "already_set_up",
  CODE_REQUESTED_TOO_SOON: "code_requested_too_soon",
  EMAIL_UNAVAILABLE: "email_unavailable",
  UNEXPECTED: "unexpected"
} as const);
