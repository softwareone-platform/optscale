import { useMemo } from "react";
import { AUTH_ERROR_CODE, AuthApiError } from "@theme/api/auth/errors";
import { confirmChallengeEnrollment, startChallengeEnrollment } from "@theme/api/auth/mfaMethods";
import { AuthToken, LoginChallenge, MFA_VERIFICATION_FAILURE, MfaTerminalFailureReason } from "@theme/api/auth/signIn";
import type { MfaEnrollmentCalls } from "@theme/components/AddMfaMethod";

// By code, not by status as `getMfaVerificationFailure` does: here a 404 can also be an expired pending method, which
// the dialog starts again.
const TERMINAL_FAILURE_REASON: Partial<Record<string, MfaTerminalFailureReason>> = {
  [AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND]: MFA_VERIFICATION_FAILURE.CHALLENGE_EXPIRED,
  [AUTH_ERROR_CODE.MFA_ATTEMPTS_EXCEEDED]: MFA_VERIFICATION_FAILURE.CHALLENGE_LOCKED,
  [AUTH_ERROR_CODE.TOO_MANY_FAILED_ATTEMPTS]: MFA_VERIFICATION_FAILURE.TOO_MANY_FAILED_ATTEMPTS,
  [AUTH_ERROR_CODE.MFA_ALREADY_ENROLLED]: MFA_VERIFICATION_FAILURE.MFA_ALREADY_SET_UP
};

const getTerminalFailureReason = (error: unknown) =>
  error instanceof AuthApiError ? TERMINAL_FAILURE_REASON[error.errorCode] : undefined;

/**
 * The add-method dialog's calls, made on `/users/{user_id}/mfa_methods` with the `enrollment_required` challenge in the
 * body. Confirming also returns the token, which goes to `onTokenIssued`. A gone or locked challenge, or one the service
 * refuses for good, ends the sign-in through `onChallengeEnded` — the dialog's own retry could never succeed.
 */
export const useChallengeMfaEnrollment = ({
  challenge: { user_id: userId, challenge_id: challengeId },
  onChallengeEnded,
  onTokenIssued
}: {
  challenge: Pick<LoginChallenge, "user_id" | "challenge_id">;
  onChallengeEnded: (reason: MfaTerminalFailureReason) => void;
  onTokenIssued: (token: AuthToken) => void;
}): MfaEnrollmentCalls =>
  useMemo(() => {
    const endIfChallengeEnded = (error: unknown): never => {
      const reason = getTerminalFailureReason(error);

      if (reason) {
        onChallengeEnded(reason);
      }

      throw error;
    };

    return {
      start: (type) => startChallengeEnrollment({ userId, challengeId, type }).catch(endIfChallengeEnded),
      confirm: async ({ methodId, code }) => {
        const { method, token } = await confirmChallengeEnrollment({ userId, challengeId, methodId, code }).catch(
          endIfChallengeEnded
        );

        onTokenIssued(token);

        return method;
      }
    };
  }, [userId, challengeId, onChallengeEnded, onTokenIssued]);
