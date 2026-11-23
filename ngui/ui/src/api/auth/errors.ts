/** A value filling a `%s` in an error's `reason` — the auth service passes strings and numbers. */
export type AuthErrorParam = string | number;

export const AUTH_ERROR_CODE = Object.freeze({
  NOT_FOUND: "OA0003",
  FORBIDDEN: "OA0012",
  // "%s with id %s was not found" — an organization the service does not know, for one.
  RESOURCE_NOT_FOUND: "OA0028",
  // "%s is not provided" — a required parameter, such as a new authenticator app's `label`.
  NOT_PROVIDED: "OA0032",
  INVALID_CREDENTIALS: "OA0037",
  INVALID_VALUE: "OA0060",
  INTERNAL_ERROR: "OA0061",
  TOKEN_REQUIRED: "OA0062",
  // Not an OA code: what the service writes for a bare `HTTPError(503)`, an e-mail it cannot send.
  SERVICE_UNAVAILABLE: "U0503",
  INVALID_VERIFICATION_CODE: "OA0071",
  CODE_REQUESTED_TOO_SOON: "OA0072",
  EMAIL_NOT_VERIFIED: "OA0073",
  AUTH_POLICY_EXISTS: "OA0081",
  // Only for e-mail: a user can have any number of authenticator apps.
  MFA_METHOD_EXISTS: "OA0082",
  INVALID_AUTHENTICATION_CODE: "OA0083",
  MFA_METHOD_ALREADY_CONFIRMED: "OA0084",
  LOGIN_CHALLENGE_NOT_FOUND: "OA0085",
  INVALID_MFA_CODE: "OA0086",
  MFA_ATTEMPTS_EXCEEDED: "OA0087",
  // A code sent to an `enrollment_required` challenge.
  MFA_ENROLLMENT_REQUIRED: "OA0088",
  // Another sign-in of the user's already enrolled a method, so this challenge can no longer.
  MFA_ALREADY_ENROLLED: "OA0089",
  // 10 wrong codes per user in 15 minutes, across challenges — also refused when a sign-in would start a new one.
  TOO_MANY_FAILED_ATTEMPTS: "OA0090",
  // Removing the last confirmed method while an organization enforces MFA.
  LAST_MFA_METHOD_ENFORCED: "OA0091",
  // Making a pending method the default.
  MFA_METHOD_NOT_CONFIRMED: "OA0092"
} as const);

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
