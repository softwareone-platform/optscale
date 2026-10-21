import { v4 as uuidv4 } from "uuid";
import { AUTH_ERROR_CODE, CREATE_TOKEN_STATUS, LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn/constants";
import { AuthApiError } from "@theme/api/auth/signIn/errors";
import { CreateToken, LoginChallenge, LoginChallengeState } from "@theme/api/auth/signIn/types";
import { delay, MOCK_LATENCY_MS } from "@theme/api/mocked/mockDelay";
import { getAuthToken, getConfirmedMethods, TOTP_METHOD_ID } from "./fixtures";

/** The only password the mock accepts — anything else answers like invalid credentials. */
export const MOCK_PASSWORD = "password";

/**
 * Outcome is selected from the email local part so every branch is reachable by typing an
 * address into the login form. See the README next to this file.
 */
export const MOCK_EMAIL_PREFIX = Object.freeze({
  MFA_REQUIRED: "mfa",
  ENROLLMENT_REQUIRED: "enroll",
  EMAIL_NOT_VERIFIED: "unverified",
  INTERNAL_ERROR: "error"
} as const);

const CHALLENGE_TTL_SECONDS = 5 * 60;

const MAX_ATTEMPTS = 5;

const getLocalPart = (email: string) => email.trim().toLowerCase().split("@")[0] ?? "";

const buildChallenge = (email: string, state: LoginChallengeState): LoginChallenge => {
  const requiresEnrollment = state === LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED;

  return {
    challenge_id: uuidv4(),
    state,
    expires_at: Math.floor(Date.now() / 1000) + CHALLENGE_TTL_SECONDS,
    user_email: email,
    methods: requiresEnrollment ? [] : getConfirmedMethods(email),
    default_method_id: requiresEnrollment ? null : TOTP_METHOD_ID,
    // The default method is the authenticator app, which generates its code locally.
    code_sent: false,
    attempts_left: MAX_ATTEMPTS
  };
};

/**
 * Stands in for `POST /auth/v2/tokens` until the auth service grows the challenge branch.
 * Resolves with the status and body the real endpoint would return, and rejects with an
 * {@link AuthApiError} carrying the optscale error envelope.
 */
export const createTokenMock: CreateToken = async ({ email, password }) => {
  await delay(MOCK_LATENCY_MS);

  const localPart = getLocalPart(email);

  if (password !== MOCK_PASSWORD) {
    throw new AuthApiError({
      status: 403,
      errorCode: AUTH_ERROR_CODE.INVALID_CREDENTIALS,
      reason: "Email or password is invalid"
    });
  }

  if (localPart.startsWith(MOCK_EMAIL_PREFIX.EMAIL_NOT_VERIFIED)) {
    throw new AuthApiError({
      status: 403,
      errorCode: AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED,
      reason: "Email is not verified"
    });
  }

  if (localPart.startsWith(MOCK_EMAIL_PREFIX.INTERNAL_ERROR)) {
    throw new AuthApiError({
      status: 500,
      errorCode: AUTH_ERROR_CODE.INTERNAL_ERROR,
      reason: "Database error"
    });
  }

  if (localPart.startsWith(MOCK_EMAIL_PREFIX.ENROLLMENT_REQUIRED)) {
    return {
      status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED,
      data: buildChallenge(email, LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED)
    };
  }

  if (localPart.startsWith(MOCK_EMAIL_PREFIX.MFA_REQUIRED)) {
    return {
      status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED,
      data: buildChallenge(email, LOGIN_CHALLENGE_STATE.MFA_REQUIRED)
    };
  }

  return {
    status: CREATE_TOKEN_STATUS.TOKEN_ISSUED,
    data: getAuthToken(email)
  };
};
