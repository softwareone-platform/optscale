import { v4 as uuidv4 } from "uuid";
import { MFA_METHOD_TYPE } from "@theme/api/auth/signIn/constants";
import { AuthApiError } from "@theme/api/auth/signIn/errors";
import {
  AuthErrorParam,
  AuthToken,
  LoginChallenge,
  LoginOptions,
  MfaMethod,
  MfaMethodType
} from "@theme/api/auth/signIn/types";
import { MOCK_LOGIN_CHALLENGE } from "@theme/api/mocked/config";
import loginOptions from "@theme/api/mocked/responses/auth/v2/login_options/200.json";
import token from "@theme/api/mocked/responses/auth/v2/tokens/201-token.json";
import enrollmentRequired from "@theme/api/mocked/responses/auth/v2/tokens/202-enrollment-required.json";
import mfaEmailDefault from "@theme/api/mocked/responses/auth/v2/tokens/202-mfa-email-default.json";
import mfaNoConfirmedMethods from "@theme/api/mocked/responses/auth/v2/tokens/202-mfa-no-confirmed-methods.json";
import mfaNoDefault from "@theme/api/mocked/responses/auth/v2/tokens/202-mfa-no-default.json";
import mfaTotpDefault from "@theme/api/mocked/responses/auth/v2/tokens/202-mfa-totp-default.json";
import emailNotVerified from "@theme/api/mocked/responses/auth/v2/tokens/403-email-not-verified.json";
import invalidCredentials from "@theme/api/mocked/responses/auth/v2/tokens/403-invalid-credentials.json";
import invalidMfaCode from "@theme/api/mocked/responses/auth/v2/tokens/403-invalid-mfa-code.json";
import mfaAttemptsExceeded from "@theme/api/mocked/responses/auth/v2/tokens/403-mfa-attempts-exceeded.json";
import loginChallengeNotFound from "@theme/api/mocked/responses/auth/v2/tokens/404-login-challenge-not-found.json";
import internalError from "@theme/api/mocked/responses/auth/v2/tokens/500-internal-error.json";
import { getCurrentUTCTimeInSec } from "utils/datetime";

/**
 * The typed side of `api/mocked/responses/` — the bodies themselves are JSON, copied from the
 * "FFC: TDR FinOps for Cloud MFA" design record.
 *
 * A JSON import widens `"totp"` to `string`, so a body cannot be declared as its contract type. A plain
 * `as` would also accept a file that lost a field, so these first demand every contract key: a renamed
 * or deleted field fails `tsc`. Enum values are checked in `fixtures.test.ts`.
 */

type ErrorBody = { error: { status_code: number; error_code: string; reason: string; params: AuthErrorParam[] } };

const asLoginChallenge = (body: Record<keyof LoginChallenge, unknown> & { methods: Record<keyof MfaMethod, unknown>[] }) =>
  body as LoginChallenge;

const asErrorBody = (body: { error: Record<keyof ErrorBody["error"], unknown> }) => body as ErrorBody;

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
  EMAIL_NOT_VERIFIED: asErrorBody(emailNotVerified),
  INTERNAL_ERROR: asErrorBody(internalError),
  INVALID_MFA_CODE: asErrorBody(invalidMfaCode),
  MFA_ATTEMPTS_EXCEEDED: asErrorBody(mfaAttemptsExceeded),
  LOGIN_CHALLENGE_NOT_FOUND: asErrorBody(loginChallengeNotFound)
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
  expires_at: getCurrentUTCTimeInSec() + ttlSeconds,
  user_email: email,
  attempts_left: attemptsLeft,
  // The service labels an e-mail method with the masked address it sends to.
  methods: body.methods.map((method) =>
    method.type === MFA_METHOD_TYPE.EMAIL ? { ...method, label: maskEmail(email) } : method
  )
});

export const issueToken = (email: string): AuthToken => ({ ...TOKEN_BODY, user_email: email });

/** Fills each `%s` in `reason` with the next param, the way the auth service's exceptions do. */
const formatReason = (reason: string, params: AuthErrorParam[]) =>
  params.reduce<string>((formatted, param) => formatted.replace("%s", String(param)), reason);

export const authError = ({ error }: ErrorBody, params: AuthErrorParam[] = error.params) =>
  new AuthApiError({
    status: error.status_code,
    errorCode: error.error_code,
    reason: formatReason(error.reason, params),
    params
  });
