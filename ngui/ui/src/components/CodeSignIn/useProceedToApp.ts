import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_TOKEN_STATUS, CreateTokenResponse } from "api/auth/signIn";
import { useCompleteSignIn } from "hooks/useCompleteSignIn";
import { useStartLoginChallenge } from "hooks/useLoginChallenge";
import { INITIALIZE, OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME, SHOW_POLICY_QUERY_PARAM } from "urls";
import { getSearchParams, stringifySearchParams } from "utils/network";

/**
 * What "Proceed" does after a recovery or verification sign-in: straight in with a token, or through MFA first.
 * Either way the app opens with the capability the page was opened with, and the policy prompt if asked for.
 */
export const useProceedToApp = () => {
  const navigate = useNavigate();
  const completeSignIn = useCompleteSignIn();
  const startLoginChallenge = useStartLoginChallenge();

  return useCallback(
    (signIn: CreateTokenResponse, { showPolicy = false }: { showPolicy?: boolean } = {}) => {
      const { [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability } = getSearchParams() as Record<string, string>;
      const search = `?${stringifySearchParams({
        ...(showPolicy ? { [SHOW_POLICY_QUERY_PARAM]: true } : {}),
        [OPTSCALE_CAPABILITY_QUERY_PARAMETER_NAME]: capability
      })}`;

      if (signIn.status === CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED) {
        startLoginChallenge(signIn.data, { continuation: { search } });
        return;
      }

      completeSignIn(signIn.data);
      navigate(`${INITIALIZE}${search}`);
    },
    [navigate, completeSignIn, startLoginChallenge]
  );
};
