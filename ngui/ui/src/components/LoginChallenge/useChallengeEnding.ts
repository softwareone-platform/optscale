import { useCallback, useEffect } from "react";
import { LoginChallenge, MFA_VERIFICATION_FAILURE, MfaTerminalFailureReason } from "api/auth/signIn";
import { useEndLoginChallenge } from "hooks/useLoginChallenge";
import { useSecondsUntil } from "hooks/useSecondsUntil";

/** The challenge's countdown, and the ways it ends for good — on its own once the countdown reaches zero. */
export const useChallengeEnding = (challenge: LoginChallenge) => {
  const endLoginChallenge = useEndLoginChallenge();
  const secondsUntilExpiry = useSecondsUntil(challenge.expires_at);

  const endChallenge = useCallback(
    (reason: MfaTerminalFailureReason) => endLoginChallenge({ reason, userEmail: challenge.user_email }),
    [endLoginChallenge, challenge.user_email]
  );

  const endExpiredChallenge = useCallback(() => endChallenge(MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED), [endChallenge]);

  useEffect(() => {
    if (secondsUntilExpiry === 0) {
      endExpiredChallenge();
    }
  }, [secondsUntilExpiry, endExpiredChallenge]);

  return { secondsUntilExpiry, endChallenge, endExpiredChallenge };
};
