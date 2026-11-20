import { LOGIN_CHALLENGE_STATE } from "api/auth/signIn/constants";
import { CompleteLoginChallenge } from "api/auth/signIn/types";
import { MOCK_SIGN_IN_CREDENTIALS } from "api/mocked/config";
import { authError } from "api/mocked/errorBodies";
import { consumeChallenge, findLiveChallenge } from "api/mocked/state/challenges";
import { refuseIfTooManyFailedAttempts, wrongCodeError } from "./challengeAttempts";
import { ERROR_BODY, issueToken } from "./fixtures";

/**
 * Stands in for `POST /auth/v2/tokens` with a challenge, following the TDR's sign-in workflow: a wrong code costs an
 * attempt, the last wrong code consumes the challenge, a right one consumes it and issues the token.
 */
export const completeLoginChallengeMock: CompleteLoginChallenge = async ({ challenge_id, code }) => {
  const challenge = findLiveChallenge(challenge_id);

  if (!challenge) {
    throw authError(ERROR_BODY.LOGIN_CHALLENGE_NOT_FOUND);
  }

  // The way through is confirming a first method under the challenge, which issues the token itself.
  if (challenge.state === LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED) {
    throw authError(ERROR_BODY.MFA_ENROLLMENT_REQUIRED);
  }

  refuseIfTooManyFailedAttempts(challenge.user_id);

  if (code !== MOCK_SIGN_IN_CREDENTIALS.mfaCode) {
    throw wrongCodeError(challenge_id);
  }

  consumeChallenge(challenge_id);

  return issueToken(challenge.user_email);
};
