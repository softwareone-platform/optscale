import { postAuth } from "../request";
import { CreateToken, CreateTokenResponse } from "./types";

/**
 * `POST /auth/v2/tokens` — the password step of sign-in, and the code step of password recovery and e-mail
 * verification. `201` carries a token, `202` a login challenge.
 */
export const createToken: CreateToken = async (params) =>
  // The service's contract is not something TypeScript can verify — this is the one cast.
  (await postAuth("/tokens", params)) as CreateTokenResponse;
