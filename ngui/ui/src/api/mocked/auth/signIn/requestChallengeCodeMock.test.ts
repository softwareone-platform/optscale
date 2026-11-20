import { describe, expect, it } from "vitest";
import { AUTH_ERROR_CODE } from "api/auth/errors";
import { MOCK_SIGN_IN_CREDENTIALS } from "api/mocked/config";
import { createTokenMock } from "./createTokenMock";
import { EMAIL_METHOD_ID } from "./fixtures";
import { requestChallengeCodeMock } from "./requestChallengeCodeMock";
import { SIGN_IN_SCENARIO, SignInScenario } from "./scenarios";

const startChallenge = async (scenario: SignInScenario) => {
  const { data } = await createTokenMock(MOCK_SIGN_IN_CREDENTIALS, scenario);

  return (data as { challenge_id: string }).challenge_id;
};

describe("requestChallengeCodeMock", () => {
  it("sends a code for a challenge that has not mailed one yet", async () => {
    const challengeId = await startChallenge(SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT);

    await expect(requestChallengeCodeMock({ challengeId: challengeId, method_id: EMAIL_METHOD_ID })).resolves.toBeUndefined();
  });

  it("counts the code mailed with the 202 toward the once-a-minute limit", async () => {
    const challengeId = await startChallenge(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);

    await expect(requestChallengeCodeMock({ challengeId: challengeId, method_id: EMAIL_METHOD_ID })).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.CODE_REQUESTED_TOO_SOON
    });
  });

  it("answers 404 for a challenge that does not exist", async () => {
    await expect(requestChallengeCodeMock({ challengeId: "missing", method_id: EMAIL_METHOD_ID })).rejects.toMatchObject({
      status: 404,
      errorCode: AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND
    });
  });
});
