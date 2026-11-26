import { postAuth } from "../request";
import { RequestChallengeCode } from "./types";

/**
 * `POST /auth/v2/login_challenge_codes` — e-mails a fresh code for one of the challenge's e-mail methods. The challenge
 * id is a credential, so it goes in the body, never the URL. `204`; `403` within a minute of the last code.
 */
export const requestChallengeCode: RequestChallengeCode = async ({ challengeId, method_id }) => {
  await postAuth("/login_challenge_codes", { challenge_id: challengeId, method_id });
};
