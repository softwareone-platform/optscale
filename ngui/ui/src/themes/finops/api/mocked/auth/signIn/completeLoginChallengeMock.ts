import { CompleteLoginChallenge } from "@theme/api/auth/signIn/types";
import { MOCK_LATENCY_MS, MOCK_SIGN_IN_CREDENTIALS } from "@theme/api/mocked/config";
import { delay } from "@theme/api/mocked/mockDelay";
import { consumeChallenge, findLiveChallenge, recordFailedAttempt } from "./challengeStore";
import { authError, ERROR_BODY, issueToken } from "./fixtures";

/**
 * Stands in for `POST /auth/v2/tokens` with a challenge, following the TDR's sign-in workflow: a
 * wrong code costs an attempt, the last wrong code consumes the challenge, a right one consumes it
 * and issues the token. Each rejection is built from its file in `api/mocked/responses/`.
 */
export const completeLoginChallengeMock: CompleteLoginChallenge = async ({ challenge_id, code }) => {
  await delay(MOCK_LATENCY_MS);

  const challenge = findLiveChallenge(challenge_id);

  if (!challenge) {
    throw authError(ERROR_BODY.LOGIN_CHALLENGE_NOT_FOUND);
  }

  if (code === MOCK_SIGN_IN_CREDENTIALS.mfaCode) {
    consumeChallenge(challenge_id);

    return issueToken(challenge.user_email);
  }

  const attemptsLeft = recordFailedAttempt(challenge_id);

  if (attemptsLeft <= 0) {
    consumeChallenge(challenge_id);

    throw authError(ERROR_BODY.MFA_ATTEMPTS_EXCEEDED);
  }

  throw authError(ERROR_BODY.INVALID_MFA_CODE, [attemptsLeft]);
};
