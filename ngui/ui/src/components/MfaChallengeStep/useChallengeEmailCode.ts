import { useCallback, useState } from "react";
import { AUTH_ERROR_CODE, AuthApiError } from "api/auth/errors";
import { LoginChallenge, requestChallengeCode } from "api/auth/signIn";
import { EMAIL_CODE_FAILURE } from "./constants";
import { EmailCodeFailure } from "./types";

type UseChallengeEmailCodeParams = {
  challenge: Pick<LoginChallenge, "challenge_id" | "code_sent">;
  canRequestCode: boolean;
  /** The service answers 404 for a challenge that expired or was consumed meanwhile. */
  onChallengeGone: () => void;
};

/** The e-mail code of a challenge: whether one went out, and sending another — the service refuses one asked for too soon. */
export const useChallengeEmailCode = ({ challenge, canRequestCode, onChallengeGone }: UseChallengeEmailCodeParams) => {
  const [isSent, setIsSent] = useState(challenge.code_sent);
  const [isSending, setIsSending] = useState(false);
  // Without code requests a code the 202 did not send never comes.
  const [failure, setFailure] = useState<EmailCodeFailure | null>(() =>
    challenge.code_sent || canRequestCode ? null : EMAIL_CODE_FAILURE.NOT_SENT
  );

  const send = useCallback(
    async (methodId: string) => {
      setFailure(null);
      setIsSending(true);

      try {
        await requestChallengeCode({ challengeId: challenge.challenge_id, method_id: methodId });
        setIsSent(true);
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

  return { isSent, isSending, failure, send };
};
