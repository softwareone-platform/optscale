import { authError } from "@theme/api/mocked/errorBodies";
import { consumeChallenge, hasTooManyRecentFailedAttempts, recordFailedAttempt } from "@theme/api/mocked/state/challenges";
import { ERROR_BODY } from "./fixtures";

/** A code under any of the user's challenges: past the user's limit of wrong ones, even the right code is refused. */
export const refuseIfTooManyFailedAttempts = (userId: string) => {
  if (hasTooManyRecentFailedAttempts(userId)) {
    throw authError(ERROR_BODY.TOO_MANY_FAILED_ATTEMPTS);
  }
};

/** A wrong code costs one of the challenge's attempts, the last one revoking it. Returned for the caller to throw. */
export const wrongCodeError = (challengeId: string) => {
  const attemptsLeft = recordFailedAttempt(challengeId);

  if (attemptsLeft <= 0) {
    consumeChallenge(challengeId);

    return authError(ERROR_BODY.MFA_ATTEMPTS_EXCEEDED);
  }

  return authError(ERROR_BODY.INVALID_MFA_CODE, [attemptsLeft]);
};
