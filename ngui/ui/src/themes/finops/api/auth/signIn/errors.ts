import { AUTH_ERROR_CODE } from "./constants";

/**
 * Carries the optscale error envelope `{"error": {"error_code": "OA00xx", "reason": "…"}}`
 * so callers can branch on the code instead of on a message.
 */
export class AuthApiError extends Error {
  readonly status: number;

  readonly errorCode: string;

  constructor({ status, errorCode, reason }: { status: number; errorCode: string; reason: string }) {
    super(reason);
    this.name = "AuthApiError";
    this.status = status;
    this.errorCode = errorCode;
  }
}

const hasErrorCode = (error: unknown, errorCode: string) => error instanceof AuthApiError && error.errorCode === errorCode;

export const isInvalidCredentialsError = (error: unknown): boolean => hasErrorCode(error, AUTH_ERROR_CODE.INVALID_CREDENTIALS);

export const isEmailNotVerifiedError = (error: unknown): boolean => hasErrorCode(error, AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED);
