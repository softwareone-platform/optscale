import { LoginChallenge } from "api/auth/signIn/types";
import { MOCK_MFA } from "api/mocked/config";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import { mockState } from "./mockState";

export const storeChallenge = (
  { challenge_id, user_id, state, expires_at, attempts_left, user_email, code_sent }: LoginChallenge,
  nowSeconds = getCurrentUTCTimeInSec()
) => {
  mockState.challenges.set(challenge_id, {
    user_id,
    state,
    expires_at,
    attempts_left,
    user_email,
    codeSentAt: code_sent ? nowSeconds : null,
    isEnrollmentClosed: false
  });
};

/** An expired challenge is as gone as a consumed one — the service answers both with 404. */
export const findLiveChallenge = (challengeId: string, nowSeconds = getCurrentUTCTimeInSec()) => {
  const challenge = mockState.challenges.get(challengeId);

  return challenge && challenge.expires_at > nowSeconds ? challenge : undefined;
};

const recentFailedAttemptTimes = (userId: string, nowSeconds: number) =>
  (mockState.failedAttemptTimesByUser.get(userId) ?? []).filter(
    (failedAt) => nowSeconds - failedAt < MOCK_MFA.USER_FAILED_ATTEMPTS_WINDOW_SECONDS
  );

export const hasTooManyRecentFailedAttempts = (userId: string, nowSeconds = getCurrentUTCTimeInSec()) =>
  recentFailedAttemptTimes(userId, nowSeconds).length >= MOCK_MFA.USER_FAILED_ATTEMPTS_LIMIT;

/** Costs the challenge one of its attempts and the user one of the window's; returns the challenge's attempts left. */
export const recordFailedAttempt = (challengeId: string, nowSeconds = getCurrentUTCTimeInSec()) => {
  const challenge = mockState.challenges.get(challengeId);

  if (!challenge) {
    return 0;
  }

  challenge.attempts_left -= 1;
  mockState.failedAttemptTimesByUser.set(challenge.user_id, [
    ...recentFailedAttemptTimes(challenge.user_id, nowSeconds),
    nowSeconds
  ]);

  return challenge.attempts_left;
};

/**
 * Records a new e-mail code, or returns `false` while the last one is under a minute old. The service throttles
 * per address, so a code sent with the `202` counts too.
 */
export const recordCodeSent = (challengeId: string, nowSeconds = getCurrentUTCTimeInSec()) => {
  const challenge = mockState.challenges.get(challengeId);

  if (!challenge || (challenge.codeSentAt !== null && nowSeconds - challenge.codeSentAt < MOCK_MFA.CODE_THROTTLE_SECONDS)) {
    return false;
  }

  challenge.codeSentAt = nowSeconds;

  return true;
};

export const consumeChallenge = (challengeId: string) => {
  mockState.challenges.delete(challengeId);
};

/** Consumes the challenge that enrolled a method; the user's other challenges can no longer enroll one. */
export const consumeEnrollingChallenge = (challengeId: string) => {
  const enrolling = mockState.challenges.get(challengeId);

  for (const challenge of mockState.challenges.values()) {
    if (challenge.user_id === enrolling?.user_id) {
      challenge.isEnrollmentClosed = true;
    }
  }

  consumeChallenge(challengeId);
};
