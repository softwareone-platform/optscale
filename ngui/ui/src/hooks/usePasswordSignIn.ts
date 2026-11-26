import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CREATE_TOKEN_STATUS, isEmailNotVerifiedError } from "api/auth/signIn";
import type { LoginFormError } from "components/forms/TwoStepLoginForm/types";
import { getPasswordSignInErrorMessageId } from "containers/AuthorizationContainer/passwordSignInError";
import { useCompleteSignIn } from "hooks/useCompleteSignIn";
import { useCreateToken } from "hooks/useCreateToken";
import { useStartLoginChallenge } from "hooks/useLoginChallenge";
import { getEmailVerificationUrl } from "urls";

/** The login page's password step: a token signs in, a `202` opens its challenge, a refusal stays as `error`. */
export const usePasswordSignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { onCreateToken, isLoading } = useCreateToken();
  const completeSignIn = useCompleteSignIn();
  const startLoginChallenge = useStartLoginChallenge();

  const [error, setError] = useState<LoginFormError | null>(null);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setError(null);

      try {
        const { status, data } = await onCreateToken({ email, password });

        if (status === CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED) {
          // The challenge URL drops the login page's query (`next`, capability), so the challenge carries it.
          startLoginChallenge(data, { continuation: { search } });
          return;
        }

        completeSignIn(data);
      } catch (signInError) {
        if (isEmailNotVerifiedError(signInError)) {
          navigate(getEmailVerificationUrl(email));
          return;
        }

        // Anything else keeps the visitor on the password step with a retryable message.
        setError({ messageId: getPasswordSignInErrorMessageId(signInError) });
      }
    },
    [navigate, search, onCreateToken, completeSignIn, startLoginChallenge]
  );

  return { signIn, isLoading, error };
};
