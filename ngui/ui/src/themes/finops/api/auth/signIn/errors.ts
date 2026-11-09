import { AUTH_ERROR_CODE, MFA_VERIFICATION_FAILURE } from "./constants";
import { AuthErrorParam, MfaVerificationFailure } from "./types";

/**
 * Carries the optscale error envelope `{"error": {"error_code": "OA00xx", "reason": "…", "params": […]}}`
 * so callers can branch on the code instead of on a message. `params` fill the `%s` in `reason`.
 */
export class AuthApiError extends Error {
  readonly status: number;

  readonly errorCode: string;

  readonly params: AuthErrorParam[];

  constructor({
    status,
    errorCode,
    reason,
    params = []
  }: {
    status: number;
    errorCode: string;
    reason: string;
    params?: AuthErrorParam[];
  }) {
    super(reason);
    this.name = "AuthApiError";
    this.status = status;
    this.errorCode = errorCode;
    this.params = params;
  }
}

const hasErrorCode = (error: unknown, errorCode: string) => error instanceof AuthApiError && error.errorCode === errorCode;

export const isInvalidCredentialsError = (error: unknown): boolean => hasErrorCode(error, AUTH_ERROR_CODE.INVALID_CREDENTIALS);

export const isEmailNotVerifiedError = (error: unknown): boolean => hasErrorCode(error, AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED);

const toAttemptsLeft = (value: unknown) => {
  const attemptsLeft = Number(value);

  return Number.isInteger(attemptsLeft) && attemptsLeft >= 0 ? attemptsLeft : null;
};

/** Sorts a rejected `completeLoginChallenge` into what the visitor can do next. */
export const getMfaVerificationFailure = (error: unknown): MfaVerificationFailure => {
  if (!(error instanceof AuthApiError)) {
    return { kind: MFA_VERIFICATION_FAILURE.UNEXPECTED };
  }

  // Unknown, expired and consumed challenges all answer 404, whatever the code.
  if (error.status === 404) {
    return { kind: MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED };
  }

  if (error.errorCode === AUTH_ERROR_CODE.MFA_ATTEMPTS_EXCEEDED) {
    return { kind: MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED };
  }

  if (error.errorCode === AUTH_ERROR_CODE.INVALID_MFA_CODE) {
    return { kind: MFA_VERIFICATION_FAILURE.INVALID_CODE, attemptsLeft: toAttemptsLeft(error.params[0]) };
  }

  return { kind: MFA_VERIFICATION_FAILURE.UNEXPECTED };
};
