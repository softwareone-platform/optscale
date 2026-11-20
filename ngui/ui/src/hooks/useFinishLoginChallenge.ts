import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthToken } from "api/auth/signIn";
import { useCompleteSignIn } from "hooks/useCompleteSignIn";
import { SignInRouterState, useChallengeContinuation } from "hooks/useLoginChallenge";
import { INITIALIZE, PASSWORD_RECOVERY } from "urls";

/** Takes the token a passed challenge issued where its continuation says — the app, or back to password recovery. */
export const useFinishLoginChallenge = () => {
  const navigate = useNavigate();
  const continuation = useChallengeContinuation();
  const completeSignIn = useCompleteSignIn();

  return useCallback(
    (token: AuthToken) => {
      const search = continuation?.search ?? "";

      if (continuation?.returnsToPasswordRecovery) {
        const state: SignInRouterState = { recoveryToken: token };

        navigate(`${PASSWORD_RECOVERY}${search}`, { replace: true, state });
        return;
      }

      completeSignIn(token);
      navigate(`${INITIALIZE}${search}`, { replace: true });
    },
    [navigate, continuation, completeSignIn]
  );
};
