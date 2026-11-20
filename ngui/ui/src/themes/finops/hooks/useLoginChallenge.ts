import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_CHALLENGE_STATE, LoginChallenge, MfaTerminalFailureReason } from "@theme/api/auth/signIn";
import { MFA_CHALLENGE, MFA_ENROLLMENT } from "@theme/urls";

export type MfaTerminalFailure = {
  reason: MfaTerminalFailureReason;
  userEmail: string;
};

/** What the sign-in steps hand each other in router state — no token exists yet to fetch it with. */
export type SignInRouterState = {
  challenge?: LoginChallenge;
  mfaTerminalFailure?: MfaTerminalFailure;
};

const getLoginChallengeUrl = ({ state }: Pick<LoginChallenge, "state">) =>
  state === LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED ? MFA_ENROLLMENT : MFA_CHALLENGE;

const useSignInRouterState = (): SignInRouterState => (useLocation().state as SignInRouterState | null) ?? {};

/**
 * Reads the challenge handed over by the password step. It travels in router state because no
 * token exists yet, so there is nothing to re-fetch it with.
 */
export const useLoginChallenge = (): LoginChallenge | null => useSignInRouterState().challenge ?? null;

export const useMfaTerminalFailure = (): MfaTerminalFailure | null => useSignInRouterState().mfaTerminalFailure ?? null;

/** Opens the MFA or enrollment step for a `202` challenge. */
export const useStartLoginChallenge = () => {
  const navigate = useNavigate();

  return useCallback(
    (challenge: LoginChallenge, { replace = false }: { replace?: boolean } = {}) => {
      const state: SignInRouterState = { challenge };

      navigate(getLoginChallengeUrl(challenge), { replace, state });
    },
    [navigate]
  );
};

/** Swaps the challenge for the failure in the current history entry, so Back never revives a dead challenge. */
export const useEndLoginChallenge = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (mfaTerminalFailure: MfaTerminalFailure) => {
      const state: SignInRouterState = { mfaTerminalFailure };

      navigate(pathname, { replace: true, state });
    },
    [navigate, pathname]
  );
};
