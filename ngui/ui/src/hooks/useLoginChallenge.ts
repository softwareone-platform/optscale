import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthToken, LOGIN_CHALLENGE_STATE, LoginChallenge, MfaTerminalFailureReason } from "api/auth/signIn";
import { MFA_CHALLENGE, MFA_ENROLLMENT } from "urls";

export type MfaTerminalFailure = {
  reason: MfaTerminalFailureReason;
  userEmail: string;
};

/**
 * Where a passed challenge leads; without one the app opens. `search` keeps the starting page's query (capability,
 * `showPolicy`), which the challenge URL drops.
 */
export type ChallengeContinuation = {
  /** Recovery still has to set the new password with the token, so it goes back there instead of signing in. */
  returnsToPasswordRecovery?: boolean;
  search: string;
};

/** What the sign-in steps hand each other in router state — no token exists yet to fetch it with. */
export type SignInRouterState = {
  challenge?: LoginChallenge;
  continuation?: ChallengeContinuation;
  mfaTerminalFailure?: MfaTerminalFailure;
  /** Back on the recovery page after its challenge; the new password is set with this token. */
  recoveryToken?: AuthToken;
};

const getLoginChallengeUrl = ({ state }: Pick<LoginChallenge, "state">) =>
  state === LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED ? MFA_ENROLLMENT : MFA_CHALLENGE;

const useSignInRouterState = (): SignInRouterState => (useLocation().state as SignInRouterState | null) ?? {};

export const useLoginChallenge = (): LoginChallenge | null => useSignInRouterState().challenge ?? null;

export const useMfaTerminalFailure = (): MfaTerminalFailure | null => useSignInRouterState().mfaTerminalFailure ?? null;

export const useChallengeContinuation = (): ChallengeContinuation | null => useSignInRouterState().continuation ?? null;

export const useRecoveryToken = (): AuthToken | null => useSignInRouterState().recoveryToken ?? null;

/** Opens the MFA or enrollment step for a `202` challenge. */
export const useStartLoginChallenge = () => {
  const navigate = useNavigate();

  return useCallback(
    (
      challenge: LoginChallenge,
      { replace = false, continuation }: { replace?: boolean; continuation?: ChallengeContinuation } = {}
    ) => {
      const state: SignInRouterState = { challenge, continuation };

      navigate(getLoginChallengeUrl(challenge), { replace, state });
    },
    [navigate]
  );
};

/**
 * Swaps the challenge for the failure in the current history entry, so Back never revives a dead challenge. The
 * continuation stays, so a fresh sign-in keeps the query the first one started with.
 */
export const useEndLoginChallenge = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const continuation = useChallengeContinuation() ?? undefined;

  return useCallback(
    (mfaTerminalFailure: MfaTerminalFailure) => {
      const state: SignInRouterState = { mfaTerminalFailure, continuation };

      navigate(pathname, { replace: true, state });
    },
    [navigate, pathname, continuation]
  );
};
