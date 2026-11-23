import { v4 as uuidv4 } from "uuid";
import { MFA_METHOD_TYPE, MfaMethod, MfaMethodType } from "api/auth/mfaMethod";
import { AuthToken, LoginChallenge, LoginOptions } from "api/auth/signIn/types";
import { MOCK_LOGIN_CHALLENGE } from "api/mocked/config";
import { asErrorBody } from "api/mocked/errorBodies";
import codeRequestedTooSoon from "api/mocked/responses/auth/v2/login_challenges/codes/403-code-requested-too-soon.json";
import codeChallengeNotFound from "api/mocked/responses/auth/v2/login_challenges/codes/404-login-challenge-not-found.json";
import loginOptions from "api/mocked/responses/auth/v2/login_options/200.json";
import token from "api/mocked/responses/auth/v2/tokens/201-token.json";
import enrollmentRequired from "api/mocked/responses/auth/v2/tokens/202-enrollment-required.json";
import mfaEmailDefault from "api/mocked/responses/auth/v2/tokens/202-mfa-email-default.json";
import mfaNoConfirmedMethods from "api/mocked/responses/auth/v2/tokens/202-mfa-no-confirmed-methods.json";
import mfaNoDefault from "api/mocked/responses/auth/v2/tokens/202-mfa-no-default.json";
import mfaTotpDefault from "api/mocked/responses/auth/v2/tokens/202-mfa-totp-default.json";
import emailNotVerified from "api/mocked/responses/auth/v2/tokens/403-email-not-verified.json";
import invalidCredentials from "api/mocked/responses/auth/v2/tokens/403-invalid-credentials.json";
import invalidMfaCode from "api/mocked/responses/auth/v2/tokens/403-invalid-mfa-code.json";
import invalidVerificationCode from "api/mocked/responses/auth/v2/tokens/403-invalid-verification-code.json";
import mfaAttemptsExceeded from "api/mocked/responses/auth/v2/tokens/403-mfa-attempts-exceeded.json";
import mfaEnrollmentRequired from "api/mocked/responses/auth/v2/tokens/403-mfa-enrollment-required.json";
import tooManyFailedAttempts from "api/mocked/responses/auth/v2/tokens/403-too-many-failed-attempts.json";
import loginChallengeNotFound from "api/mocked/responses/auth/v2/tokens/404-login-challenge-not-found.json";
import internalError from "api/mocked/responses/auth/v2/tokens/500-internal-error.json";
import { findRealSession } from "api/mocked/state/realSession";
import { getCurrentUTCTimeInSec } from "utils/datetime";

/**
 * The typed side of `api/mocked/responses/` — the bodies themselves are JSON, copied from the
 * "FFC: TDR FinOps for Cloud MFA" design record.
 *
 * A JSON import widens `"totp"` to `string`, so a body cannot be declared as its contract type. A plain
 * `as` would also accept a file that lost a field, so these first demand every contract key: a renamed
 * or deleted field fails `tsc`. Enum values are checked in `fixtures.test.ts`.
 */

const asLoginChallenge = (body: Record<keyof LoginChallenge, unknown> & { methods: Record<keyof MfaMethod, unknown>[] }) =>
  body as LoginChallenge;

const asLoginOptions = (body: Record<keyof LoginOptions, unknown>) => body as LoginOptions;

export const LOGIN_OPTIONS_BODY = asLoginOptions(loginOptions);

export const TOKEN_BODY: AuthToken = token;

export const CHALLENGE_BODY = Object.freeze({
  MFA_TOTP_DEFAULT: asLoginChallenge(mfaTotpDefault),
  MFA_EMAIL_DEFAULT: asLoginChallenge(mfaEmailDefault),
  MFA_NO_DEFAULT: asLoginChallenge(mfaNoDefault),
  // Breaks the contract on purpose — the service lists confirmed methods only — to reach the UI's guard.
  MFA_NO_CONFIRMED_METHODS: asLoginChallenge(mfaNoConfirmedMethods),
  ENROLLMENT_REQUIRED: asLoginChallenge(enrollmentRequired)
});

// Keys match `AUTH_ERROR_CODE`'s, so `fixtures.test.ts` can pair each file with its code.
export const ERROR_BODY = Object.freeze({
  INVALID_CREDENTIALS: asErrorBody(invalidCredentials),
  INVALID_VERIFICATION_CODE: asErrorBody(invalidVerificationCode),
  EMAIL_NOT_VERIFIED: asErrorBody(emailNotVerified),
  INTERNAL_ERROR: asErrorBody(internalError),
  INVALID_MFA_CODE: asErrorBody(invalidMfaCode),
  MFA_ATTEMPTS_EXCEEDED: asErrorBody(mfaAttemptsExceeded),
  TOO_MANY_FAILED_ATTEMPTS: asErrorBody(tooManyFailedAttempts),
  // An `enrollment_required` challenge has no method to check a code against.
  MFA_ENROLLMENT_REQUIRED: asErrorBody(mfaEnrollmentRequired),
  LOGIN_CHALLENGE_NOT_FOUND: asErrorBody(loginChallengeNotFound)
});

// `POST /login_challenges/{challenge_id}/codes`; keyed like `ERROR_BODY`.
export const CHALLENGE_CODE_ERROR_BODY = Object.freeze({
  CODE_REQUESTED_TOO_SOON: asErrorBody(codeRequestedTooSoon),
  LOGIN_CHALLENGE_NOT_FOUND: asErrorBody(codeChallengeNotFound)
});

export const { user_id: MOCK_USER_ID } = TOKEN_BODY;

const getMethodId = (type: MfaMethodType) => {
  const method = CHALLENGE_BODY.MFA_TOTP_DEFAULT.methods.find((candidate) => candidate.type === type);

  if (!method) {
    throw new Error(`202-mfa-totp-default.json has no ${type} method`);
  }

  return method.id;
};

export const TOTP_METHOD_ID = getMethodId(MFA_METHOD_TYPE.TOTP);

export const EMAIL_METHOD_ID = getMethodId(MFA_METHOD_TYPE.EMAIL);

const maskEmail = (email: string) => {
  const [localPart = "", domain = ""] = email.split("@");

  return `${localPart.slice(0, 2)}***@${domain}`;
};

/** The fields the service fills per request: a fresh id, an expiry from now, the address that signed in. */
export const issueChallenge = (
  body: LoginChallenge,
  email: string,
  { ttlSeconds = MOCK_LOGIN_CHALLENGE.TTL_SECONDS, attemptsLeft = body.attempts_left } = {}
): LoginChallenge => ({
  ...body,
  challenge_id: uuidv4(),
  // The user the mocked sign-in hands out, so enrolling under the challenge and the later session are one user.
  user_id: issueToken(email).user_id,
  expires_at: getCurrentUTCTimeInSec() + ttlSeconds,
  user_email: email,
  attempts_left: attemptsLeft,
  // The service labels an e-mail method with the masked address it sends to.
  methods: body.methods.map((method) =>
    method.type === MFA_METHOD_TYPE.EMAIL ? { ...method, label: maskEmail(email) } : method
  )
});

/**
 * The real session captured in the dev panel when there is one, so the app's real API calls work after a mocked
 * sign-in; otherwise the file's macaroon, which no backend accepts.
 */
export const issueToken = (email: string): AuthToken => {
  const realSession = findRealSession();

  if (realSession) {
    const { token: realToken, user_id, user_email } = realSession;

    return { ...TOKEN_BODY, token: realToken, user_id, user_email };
  }

  return { ...TOKEN_BODY, user_email: email };
};
