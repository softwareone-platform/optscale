import { useCallback, useState } from "react";
import { AUTH_ERROR_CODE, AuthApiError } from "api/auth/errors";
import { LoginChallenge, requestChallengeCode } from "api/auth/signIn";
import { useSecondsUntil } from "hooks/useSecondsUntil";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import { EMAIL_CODE_FAILURE, RESEND_EMAIL_CODE_AFTER_SECONDS } from "./constants";
import { EmailCodeFailure } from "./types";

type UseChallengeEmailCodeParams = {
  challenge: Pick<LoginChallenge, "challenge_id" | "code_sent">;
  /** The service answers 404 for a challenge that expired or was consumed meanwhile. */
  onChallengeGone: () => void;
};

/** The e-mail code of a challenge: whether one went out, sending another, and how long until that is allowed. */
export const useChallengeEmailCode = ({ challenge, onChallengeGone }: UseChallengeEmailCodeParams) => {
  // The code mailed with the 202 counts toward the once-a-minute limit, so it starts the countdown too.
  const [sentAt, setSentAt] = useState<number | null>(() => (challenge.code_sent ? getCurrentUTCTimeInSec() : null));
  const [isSending, setIsSending] = useState(false);
  const [failure, setFailure] = useState<EmailCodeFailure | null>(null);

  // Capped: the countdown's clock ticks once a second, so right after a send it can read 1:01.
  const secondsUntilResend = Math.min(
    RESEND_EMAIL_CODE_AFTER_SECONDS,
    useSecondsUntil(sentAt === null ? 0 : sentAt + RESEND_EMAIL_CODE_AFTER_SECONDS)
  );

  const send = useCallback(
    async (methodId: string) => {
      setFailure(null);
      setIsSending(true);

      try {
        await requestChallengeCode({ challengeId: challenge.challenge_id, method_id: methodId });
        setSentAt(getCurrentUTCTimeInSec());
      } catch (error) {
        if (error instanceof AuthApiError && error.status === 404) {
          onChallengeGone();
          return;
        }

        setFailure(
          error instanceof AuthApiError && error.errorCode === AUTH_ERROR_CODE.CODE_REQUESTED_TOO_SOON
            ? EMAIL_CODE_FAILURE.TOO_SOON
            : EMAIL_CODE_FAILURE.UNEXPECTED
        );
      } finally {
        setIsSending(false);
      }
    },
    [challenge.challenge_id, onChallengeGone]
  );

  return { isSent: sentAt !== null, isSending, failure, secondsUntilResend, send };
};
