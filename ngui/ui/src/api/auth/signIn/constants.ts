export const LOGIN_CHALLENGE_STATE = Object.freeze({
  MFA_REQUIRED: "mfa_required",
  ENROLLMENT_REQUIRED: "enrollment_required",
} as const);

/** Authentication methods `login_options` can offer for an address. `sso` joins them later. */
export const LOGIN_METHOD = Object.freeze({
  PASSWORD: "password",
} as const);

export const CREATE_TOKEN_STATUS = Object.freeze({
  TOKEN_ISSUED: 201,
  CHALLENGE_REQUIRED: 202,
} as const);

export const MFA_VERIFICATION_FAILURE = Object.freeze({
  INVALID_CODE: "invalid_code",
  CHALLENGE_EXPIRED: "challenge_expired",
  CHALLENGE_LOCKED: "challenge_locked",
  // The method the code was for was removed in another session; the challenge still holds, its method list does not.
  MFA_METHOD_REMOVED: "mfa_method_removed",
  TOO_MANY_FAILED_ATTEMPTS: "too_many_failed_attempts",
  // Only ever a terminal reason: an enrollment under the challenge ran into another sign-in's.
  MFA_ALREADY_SET_UP: "mfa_already_set_up",
  UNEXPECTED: "unexpected",
} as const);
