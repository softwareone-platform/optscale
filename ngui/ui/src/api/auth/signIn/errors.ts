import { AUTH_ERROR_CODE, AuthApiError } from "../errors";
import { MFA_VERIFICATION_FAILURE } from "./constants";
import { MfaVerificationFailure } from "./types";

const hasErrorCode = (error: unknown, errorCode: string): error is AuthApiError =>
  error instanceof AuthApiError && error.errorCode === errorCode;

export const isInvalidCredentialsError = (error: unknown): boolean => hasErrorCode(error, AUTH_ERROR_CODE.INVALID_CREDENTIALS);

export const isInvalidVerificationCodeError = (error: unknown): boolean =>
  hasErrorCode(error, AUTH_ERROR_CODE.INVALID_VERIFICATION_CODE);

export const isEmailNotVerifiedError = (error: unknown): boolean => hasErrorCode(error, AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED);

/** The user's 10 wrong codes in 15 minutes: refused even before a challenge, at the password or e-mailed code. */
export const isTooManyFailedAttemptsError = (error: unknown): boolean =>
  hasErrorCode(error, AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS);

/** What a wrong code under a challenge leaves; `null` for any other error, or a count the service left out. */
export const getAttemptsLeft = (error: unknown) => {
  if (!hasErrorCode(error, AUTH_ERROR_CODE.INVALID_MFA_CODE)) {
    return null;
  }

  const attemptsLeft = Number(error.params[0]);

  return Number.isInteger(attemptsLeft) && attemptsLeft >= 0 ? attemptsLeft : null;
};

/** Sorts a rejected `completeLoginChallenge` into what the visitor can do next. */
export const getMfaVerificationFailure = (error: unknown): MfaVerificationFailure => {
  if (!(error instanceof AuthApiError)) {
    return { kind: MFA_VERIFICATION_FAILURE.UNEXPECTED };
  }

  if (error.status === 404 && error.errorCode === AUTH_ERROR_CODE.NOT_FOUND) {
    return { kind: MFA_VERIFICATION_FAILURE.MFA_METHOD_REMOVED };
  }

  // Unknown, expired and consumed challenges all answer 404, whatever the code.
  if (error.status === 404) {
    return { kind: MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED };
  }

  if (error.errorCode === AUTH_ERROR_CODE.MFA_ATTEMPTS_EXCEEDED) {
    return { kind: MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED };
  }

  if (error.errorCode === AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS) {
    return { kind: MFA_VERIFICATION_FAILURE.TOO_MANY_FAILED_ATTEMPTS };
  }

  if (error.errorCode === AUTH_ERROR_CODE.INVALID_MFA_CODE) {
    return { kind: MFA_VERIFICATION_FAILURE.INVALID_CODE, attemptsLeft: getAttemptsLeft(error) };
  }

  return { kind: MFA_VERIFICATION_FAILURE.UNEXPECTED };
};
