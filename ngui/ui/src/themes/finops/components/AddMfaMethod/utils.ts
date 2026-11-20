import { AUTH_ERROR_CODE, AuthApiError } from "@theme/api/auth/errors";
import { ENROLLMENT_FAILURE } from "./constants";
import { EnrollmentFailure } from "./types";

export const ENROLLMENT_FAILURE_MESSAGE_ID: Record<EnrollmentFailure, string> = {
  [ENROLLMENT_FAILURE.INVALID_CODE]: "signIn:invalidVerificationCode",
  [ENROLLMENT_FAILURE.EXPIRED]: "mfaSetup:setupExpired",
  [ENROLLMENT_FAILURE.ALREADY_SET_UP]: "mfaSetup:methodAlreadySetUp",
  [ENROLLMENT_FAILURE.CODE_REQUESTED_TOO_SOON]: "mfaSetup:codeRequestedTooSoon",
  [ENROLLMENT_FAILURE.EMAIL_UNAVAILABLE]: "mfaSetup:emailServiceUnavailable",
  [ENROLLMENT_FAILURE.UNEXPECTED]: "somethingWentWrong"
};

/** Sorts a rejected start or confirm call into what the user can do next. */
export const getEnrollmentFailure = (error: unknown): EnrollmentFailure => {
  if (!(error instanceof AuthApiError)) {
    return ENROLLMENT_FAILURE.UNEXPECTED;
  }

  // An enrollment left pending for 15 minutes is discarded; the service answers 404 for it.
  if (error.status === 404) {
    return ENROLLMENT_FAILURE.EXPIRED;
  }

  switch (error.errorCode) {
    // The second is the answer when a sign-in challenge stands in for the token.
    case AUTH_ERROR_CODE.INVALID_AUTHENTICATION_CODE:
    case AUTH_ERROR_CODE.INVALID_MFA_CODE:
      return ENROLLMENT_FAILURE.INVALID_CODE;
    case AUTH_ERROR_CODE.MFA_METHOD_EXISTS:
    case AUTH_ERROR_CODE.MFA_METHOD_ALREADY_CONFIRMED:
      return ENROLLMENT_FAILURE.ALREADY_SET_UP;
    case AUTH_ERROR_CODE.CODE_REQUESTED_TOO_SOON:
      return ENROLLMENT_FAILURE.CODE_REQUESTED_TOO_SOON;
    case AUTH_ERROR_CODE.SERVICE_UNAVAILABLE:
      return ENROLLMENT_FAILURE.EMAIL_UNAVAILABLE;
    default:
      return ENROLLMENT_FAILURE.UNEXPECTED;
  }
};
