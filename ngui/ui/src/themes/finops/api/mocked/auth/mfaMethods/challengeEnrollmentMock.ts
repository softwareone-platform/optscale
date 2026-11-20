import { AUTH_ERROR_CODE, AuthApiError } from "@theme/api/auth/errors";
import { ConfirmChallengeEnrollment, StartChallengeEnrollment } from "@theme/api/auth/mfaMethods/types";
import { LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn/constants";
import { refuseIfTooManyFailedAttempts, wrongCodeError } from "@theme/api/mocked/auth/signIn/challengeAttempts";
import { ERROR_BODY as SIGN_IN_ERROR_BODY, issueToken } from "@theme/api/mocked/auth/signIn/fixtures";
import { authError } from "@theme/api/mocked/errorBodies";
import { consumeEnrollingChallenge, findLiveChallenge } from "@theme/api/mocked/state/challenges";
import { loadUserMfa } from "@theme/api/mocked/state/userMfa";
import { CONFIRMED_WITH_TOKEN_BODY, ERROR_BODY, STATUS_BODY } from "./fixtures";
import { confirmEnrollmentFor, startEnrollmentFor } from "./mfaMethodsMock";
import { SECURITY_SCENARIO } from "./scenarios";

/**
 * Stand in for `/auth/v2/users/{user_id}/mfa_methods…` called with a `challenge_id` in the body — the enforced user
 * adding a first method while signing in. The rules are the signed-in enrollment's, plus the challenge's: it has to be
 * live, `enrollment_required` and this user's, and no other of the user's challenges may have enrolled a method; a
 * wrong code costs one of its attempts; confirming consumes it and issues the token.
 *
 * The user is seeded as enforced without methods — pick that Security page scenario to find the new method there
 * after signing in.
 */

const loadEnrollingUser = ({ userId, challengeId }: { userId: string; challengeId: string }) => {
  const challenge = findLiveChallenge(challengeId);

  if (!challenge || challenge.state !== LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED || challenge.user_id !== userId) {
    throw authError(SIGN_IN_ERROR_BODY.LOGIN_CHALLENGE_NOT_FOUND);
  }

  if (challenge.isEnrollmentClosed) {
    throw authError(ERROR_BODY.MFA_ALREADY_ENROLLED);
  }

  const user = loadUserMfa({
    userId,
    scenario: SECURITY_SCENARIO.ENFORCED_NO_METHODS,
    seed: STATUS_BODY.ENFORCED_NO_METHODS
  });

  // A confirmed method can only be an earlier sign-in's, the confirmation having consumed its challenge; keeping it
  // would answer this one's enrollment 409, while the scenario says nothing is configured.
  user.methods = user.methods.filter(({ confirmed }) => !confirmed);

  return { challenge, user };
};

export const startChallengeEnrollmentMock: StartChallengeEnrollment = async ({ userId, challengeId, type, label }) => {
  const { user } = loadEnrollingUser({ userId, challengeId });

  return startEnrollmentFor(user, { userId, type, label });
};

export const confirmChallengeEnrollmentMock: ConfirmChallengeEnrollment = async ({ userId, challengeId, methodId, code }) => {
  const { challenge, user } = loadEnrollingUser({ userId, challengeId });

  refuseIfTooManyFailedAttempts(userId);

  try {
    const method = confirmEnrollmentFor(user, { methodId, code });

    consumeEnrollingChallenge(challengeId);

    return { ...CONFIRMED_WITH_TOKEN_BODY, method, token: issueToken(challenge.user_email) };
  } catch (error) {
    // Under a challenge a wrong code is one of its attempts.
    if (error instanceof AuthApiError && error.errorCode === AUTH_ERROR_CODE.INVALID_AUTHENTICATION_CODE) {
      throw wrongCodeError(challengeId);
    }

    throw error;
  }
};
