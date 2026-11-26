import { useCallback } from "react";
import { LoginChallenge, MFA_VERIFICATION_FAILURE, MfaTerminalFailureReason } from "api/auth/signIn";
import { useEndLoginChallenge } from "hooks/useLoginChallenge";

/**
 * The ways the challenge ends for good. Only the service's answers end it: the browser's clock says nothing about how
 * long the challenge, an authenticator code or an e-mailed code is still valid.
 */
export const useChallengeEnding = (challenge: LoginChallenge) => {
  const endLoginChallenge = useEndLoginChallenge();

  const endChallenge = useCallback(
    (reason: MfaTerminalFailureReason) => endLoginChallenge({ reason, userEmail: challenge.user_email }),
    [endLoginChallenge, challenge.user_email]
  );

  const endExpiredChallenge = useCallback(() => endChallenge(MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED), [endChallenge]);

  return { endChallenge, endExpiredChallenge };
};
