import { postAuth } from "./request";
import { AuthToken, CompleteLoginChallenge } from "./types";

/**
 * `POST /auth/v2/tokens` with a challenge — the MFA step of sign-in. `201` carries the token; a
 * rejection is sorted by `getMfaVerificationFailure`. Mocked in dev by `api/mocked/`.
 */
export const completeLoginChallenge: CompleteLoginChallenge = async ({ challenge_id, method_id, code }) => {
  const { data } = await postAuth<AuthToken>("/tokens", { challenge_id, method_id, code });

  return data;
};
