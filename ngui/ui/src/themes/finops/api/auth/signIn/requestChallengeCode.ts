import { postAuth } from "../request";
import { RequestChallengeCode } from "./types";

/**
 * `POST /auth/v2/login_challenges/{challenge_id}/codes` — e-mails a fresh code for one of the challenge's
 * e-mail methods. `204`; `403` within a minute of the last code. Mocked in dev by `api/mocked/`.
 */
export const requestChallengeCode: RequestChallengeCode = async ({ challengeId, method_id }) => {
  await postAuth(`/login_challenges/${encodeURIComponent(challengeId)}/codes`, { method_id });
};
