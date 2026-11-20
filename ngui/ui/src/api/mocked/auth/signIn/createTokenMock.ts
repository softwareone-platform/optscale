import { CREATE_TOKEN_STATUS } from "api/auth/signIn/constants";
import { CreateToken, LoginChallenge } from "api/auth/signIn/types";
import { MOCK_LOGIN_CHALLENGE, MOCK_SIGN_IN_CREDENTIALS } from "api/mocked/config";
import { authError } from "api/mocked/errorBodies";
import { storeChallenge } from "api/mocked/state/challenges";
import { getMockPassword } from "api/mocked/state/password";
import { CHALLENGE_BODY, ERROR_BODY, issueChallenge, issueToken } from "./fixtures";
import { DEFAULT_SIGN_IN_SCENARIO, SIGN_IN_SCENARIO, SignInScenario } from "./scenarios";

type ChallengeScenario = Exclude<
  SignInScenario,
  | typeof SIGN_IN_SCENARIO.TOKEN_ISSUED
  | typeof SIGN_IN_SCENARIO.REAL_SIGN_IN
  | typeof SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED
  | typeof SIGN_IN_SCENARIO.INTERNAL_ERROR
>;

// Keyed by every challenge scenario, so a new one fails to compile until it names its response.
const CHALLENGE_RESPONSE: Record<ChallengeScenario, { body: LoginChallenge; ttlSeconds?: number; attemptsLeft?: number }> = {
  [SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT]: { body: CHALLENGE_BODY.MFA_TOTP_DEFAULT },
  [SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT]: { body: CHALLENGE_BODY.MFA_EMAIL_DEFAULT },
  [SIGN_IN_SCENARIO.MFA_NO_DEFAULT]: { body: CHALLENGE_BODY.MFA_NO_DEFAULT },
  [SIGN_IN_SCENARIO.MFA_NO_CONFIRMED_METHODS]: { body: CHALLENGE_BODY.MFA_NO_CONFIRMED_METHODS },
  [SIGN_IN_SCENARIO.MFA_LAST_ATTEMPT]: { body: CHALLENGE_BODY.MFA_TOTP_DEFAULT, attemptsLeft: 1 },
  [SIGN_IN_SCENARIO.MFA_EXPIRING]: {
    body: CHALLENGE_BODY.MFA_TOTP_DEFAULT,
    ttlSeconds: MOCK_LOGIN_CHALLENGE.SHORT_TTL_SECONDS
  },
  [SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED]: { body: CHALLENGE_BODY.ENROLLMENT_REQUIRED }
};

/**
 * Stands in for `POST /auth/v2/tokens` until the auth service grows the challenge branch.
 * Resolves with the status and body the real endpoint would return for `scenario`, and rejects
 * with an `AuthApiError` built from the matching error response. Typed off `CreateToken`, so a
 * contract change breaks the mock at compile time.
 */
export const createTokenMock = async (
  params: Parameters<CreateToken>[0],
  scenario: SignInScenario = DEFAULT_SIGN_IN_SCENARIO
): ReturnType<CreateToken> => {
  const { email } = params;
  const isCodeSignIn = "verification_code" in params;

  if (isCodeSignIn && params.verification_code !== MOCK_SIGN_IN_CREDENTIALS.verificationCode) {
    throw authError(ERROR_BODY.INVALID_VERIFICATION_CODE);
  }

  if (!isCodeSignIn && params.password !== getMockPassword()) {
    throw authError(ERROR_BODY.INVALID_CREDENTIALS);
  }

  switch (scenario) {
    case SIGN_IN_SCENARIO.TOKEN_ISSUED:
      return { status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: issueToken(email) };
    case SIGN_IN_SCENARIO.REAL_SIGN_IN:
      throw new Error("real_sign_in is forwarded to the auth service before it reaches the mock");
    case SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED:
      // The service marks the address verified on a code sign-in, before it would check.
      if (isCodeSignIn) {
        return { status: CREATE_TOKEN_STATUS.TOKEN_ISSUED, data: issueToken(email) };
      }

      throw authError(ERROR_BODY.EMAIL_NOT_VERIFIED);
    case SIGN_IN_SCENARIO.INTERNAL_ERROR:
      throw authError(ERROR_BODY.INTERNAL_ERROR);
    default: {
      const { body, ...fill } = CHALLENGE_RESPONSE[scenario];
      const challenge = issueChallenge(body, email, fill);

      storeChallenge(challenge);

      return { status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: challenge };
    }
  }
};
