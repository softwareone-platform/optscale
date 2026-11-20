import { RequestChallengeCode } from "api/auth/signIn/types";
import { authError } from "api/mocked/errorBodies";
import { findLiveChallenge, recordCodeSent } from "api/mocked/state/challenges";
import { CHALLENGE_CODE_ERROR_BODY } from "./fixtures";

/**
 * Stands in for `POST /auth/v2/login_challenges/{challenge_id}/codes`: one code a minute per challenge.
 * `method_id` is not checked — the TDR does not say what a `totp` or unknown method answers.
 */
export const requestChallengeCodeMock: RequestChallengeCode = async ({ challengeId }) => {
  if (!findLiveChallenge(challengeId)) {
    throw authError(CHALLENGE_CODE_ERROR_BODY.LOGIN_CHALLENGE_NOT_FOUND);
  }

  if (!recordCodeSent(challengeId)) {
    throw authError(CHALLENGE_CODE_ERROR_BODY.CODE_REQUESTED_TOO_SOON);
  }
};
