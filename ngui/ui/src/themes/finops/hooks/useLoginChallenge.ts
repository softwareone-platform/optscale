import { useLocation } from "react-router-dom";
import { LoginChallenge } from "@theme/api/auth/signIn";

/**
 * Reads the challenge handed over by the password step. It travels in router state because no
 * token exists yet, so there is nothing to re-fetch it with.
 */
export const useLoginChallenge = (): LoginChallenge | null => {
  const { state } = useLocation();

  return (state as { challenge?: LoginChallenge } | null)?.challenge ?? null;
};
