import { postAuth } from "./request";
import { CreateToken, CreateTokenResponse } from "./types";

/**
 * `POST /auth/v2/tokens` — the password step of sign-in.
 *
 * `201` carries a token, `202` a login challenge. The auth service does not return the `202`
 * branch yet; in dev the mocked API plugin answers this route instead. See
 * [`api/mocked/README.md`](../../mocked/README.md).
 */
export const createToken: CreateToken = async ({ email, password }) =>
  // The service's contract is not something TypeScript can verify — this is the one cast.
  (await postAuth("/tokens", { email, password })) as CreateTokenResponse;
