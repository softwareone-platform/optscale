import { LoginChallenge } from "@theme/api/auth/signIn/types";
import { getCurrentUTCTimeInSec } from "utils/datetime";

type StoredChallenge = Pick<LoginChallenge, "expires_at" | "attempts_left" | "user_email">;

// Lives as long as the dev server's module instance, like the service's login_challenge table.
const challenges = new Map<string, StoredChallenge>();

export const storeChallenge = ({ challenge_id, expires_at, attempts_left, user_email }: LoginChallenge) => {
  challenges.set(challenge_id, { expires_at, attempts_left, user_email });
};

/** An expired challenge is as gone as a consumed one — the service answers both with 404. */
export const findLiveChallenge = (challengeId: string, nowSeconds = getCurrentUTCTimeInSec()) => {
  const challenge = challenges.get(challengeId);

  return challenge && challenge.expires_at > nowSeconds ? challenge : undefined;
};

export const recordFailedAttempt = (challengeId: string) => {
  const challenge = challenges.get(challengeId);

  if (challenge) {
    challenge.attempts_left -= 1;
  }

  return challenge?.attempts_left ?? 0;
};

export const consumeChallenge = (challengeId: string) => {
  challenges.delete(challengeId);
};
