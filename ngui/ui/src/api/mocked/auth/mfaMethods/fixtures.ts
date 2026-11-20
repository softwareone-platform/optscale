import { v4 as uuidv4 } from "uuid";
import { MFA_METHOD_TYPE, MfaMethodType } from "api/auth/mfaMethod";
import { ChallengeEnrollmentResult, MfaEnrollment, MfaMethodDetails, MfaStatus } from "api/auth/mfaMethods/types";
import { AuthToken } from "api/auth/signIn/types";
import { asErrorBody } from "api/mocked/errorBodies";
import enforcedNoMethods from "api/mocked/responses/auth/v2/users/mfa_methods/200-enforced-no-methods.json";
import enforcedWithMethods from "api/mocked/responses/auth/v2/users/mfa_methods/200-enforced-with-methods.json";
import noMethods from "api/mocked/responses/auth/v2/users/mfa_methods/200-no-methods.json";
import totpAndEmail from "api/mocked/responses/auth/v2/users/mfa_methods/200-totp-and-email.json";
import totpOnly from "api/mocked/responses/auth/v2/users/mfa_methods/200-totp-only.json";
import confirmedWithToken from "api/mocked/responses/auth/v2/users/mfa_methods/201-confirmed-with-token.json";
import emailEnrollment from "api/mocked/responses/auth/v2/users/mfa_methods/201-email-enrollment.json";
import totpEnrollment from "api/mocked/responses/auth/v2/users/mfa_methods/201-totp-enrollment.json";
import invalidValue from "api/mocked/responses/auth/v2/users/mfa_methods/400-invalid-value.json";
import tokenRequired from "api/mocked/responses/auth/v2/users/mfa_methods/401-token-required.json";
import codeRequestedTooSoon from "api/mocked/responses/auth/v2/users/mfa_methods/403-code-requested-too-soon.json";
import invalidAuthenticationCode from "api/mocked/responses/auth/v2/users/mfa_methods/403-invalid-authentication-code.json";
import mfaAlreadyEnrolled from "api/mocked/responses/auth/v2/users/mfa_methods/403-mfa-already-enrolled.json";
import notFound from "api/mocked/responses/auth/v2/users/mfa_methods/404-not-found.json";
import mfaMethodAlreadyConfirmed from "api/mocked/responses/auth/v2/users/mfa_methods/409-mfa-method-already-confirmed.json";
import mfaMethodExists from "api/mocked/responses/auth/v2/users/mfa_methods/409-mfa-method-exists.json";
import internalError from "api/mocked/responses/auth/v2/users/mfa_methods/500-internal-error.json";
import serviceUnavailable from "api/mocked/responses/auth/v2/users/mfa_methods/503-service-unavailable.json";
import { getCurrentUTCTimeInSec } from "utils/datetime";

/**
 * The typed side of `responses/auth/v2/users/mfa_methods/`: bodies shaped as the auth service sends them, with its
 * error texts. Loaders demand every contract key — see `auth/signIn/fixtures.ts`.
 */

const asMfaStatus = (body: Record<keyof MfaStatus, unknown> & { methods: Record<keyof MfaMethodDetails, unknown>[] }) =>
  body as MfaStatus;

// `secret` and `otpauth_uri` are optional — an `email` enrollment has neither.
const asMfaEnrollment = (body: Record<keyof MfaMethodDetails, unknown>) => body as MfaEnrollment;

export const STATUS_BODY = Object.freeze({
  NO_METHODS: asMfaStatus(noMethods),
  TOTP_ONLY: asMfaStatus(totpOnly),
  TOTP_AND_EMAIL: asMfaStatus(totpAndEmail),
  ENFORCED_NO_METHODS: asMfaStatus(enforcedNoMethods),
  ENFORCED_WITH_METHODS: asMfaStatus(enforcedWithMethods)
});

const asChallengeEnrollmentResult = (
  body: Record<keyof ChallengeEnrollmentResult, unknown> & {
    method: Record<keyof MfaMethodDetails, unknown>;
    token: Record<keyof AuthToken, unknown>;
  }
) => body as ChallengeEnrollmentResult;

// Confirming with a `challenge_id`: the method and the token the challenge held back.
export const CONFIRMED_WITH_TOKEN_BODY = asChallengeEnrollmentResult(confirmedWithToken);

export const ENROLLMENT_BODY: Record<MfaMethodType, MfaEnrollment> = {
  [MFA_METHOD_TYPE.TOTP]: asMfaEnrollment(totpEnrollment),
  [MFA_METHOD_TYPE.EMAIL]: asMfaEnrollment(emailEnrollment)
};

// Keys match `AUTH_ERROR_CODE`'s, so `fixtures.test.ts` can pair each file with its code.
export const ERROR_BODY = Object.freeze({
  INVALID_VALUE: asErrorBody(invalidValue),
  TOKEN_REQUIRED: asErrorBody(tokenRequired),
  CODE_REQUESTED_TOO_SOON: asErrorBody(codeRequestedTooSoon),
  INVALID_AUTHENTICATION_CODE: asErrorBody(invalidAuthenticationCode),
  MFA_ALREADY_ENROLLED: asErrorBody(mfaAlreadyEnrolled),
  NOT_FOUND: asErrorBody(notFound),
  MFA_METHOD_EXISTS: asErrorBody(mfaMethodExists),
  MFA_METHOD_ALREADY_CONFIRMED: asErrorBody(mfaMethodAlreadyConfirmed),
  INTERNAL_ERROR: asErrorBody(internalError),
  SERVICE_UNAVAILABLE: asErrorBody(serviceUnavailable)
});

/**
 * The fields the service fills per request: a fresh id and creation time, and a TOTP label the client sent.
 * Without one the file's label stays — who names a TOTP method is an open TDR question.
 */
export const issueEnrollment = (
  { type, userId, label }: { type: MfaMethodType; userId: string; label?: string },
  nowSeconds = getCurrentUTCTimeInSec()
): MfaEnrollment => ({
  ...ENROLLMENT_BODY[type],
  id: uuidv4(),
  user_id: userId,
  created_at: nowSeconds,
  // The service labels an e-mail method with the masked address it sends to, whatever the client sent.
  ...(type === MFA_METHOD_TYPE.TOTP ? { label: label ?? null } : {})
});
