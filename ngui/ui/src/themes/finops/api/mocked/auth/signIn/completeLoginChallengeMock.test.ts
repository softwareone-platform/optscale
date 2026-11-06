import { describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE } from "@theme/api/auth/signIn/constants";
import { LoginChallenge } from "@theme/api/auth/signIn/types";
import { MOCK_LOGIN_CHALLENGE, MOCK_SIGN_IN_CREDENTIALS } from "@theme/api/mocked/config";
import { completeLoginChallengeMock } from "./completeLoginChallengeMock";
import { createTokenMock } from "./createTokenMock";
import { TOTP_METHOD_ID } from "./fixtures";
import { SIGN_IN_SCENARIO, SignInScenario } from "./scenarios";

vi.mock("@theme/api/mocked/mockDelay", () => ({ delay: () => Promise.resolve() }));

const { email, password, mfaCode } = MOCK_SIGN_IN_CREDENTIALS;

const startChallenge = async (scenario: SignInScenario = SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT) =>
  (await createTokenMock({ email, password }, scenario)).data as LoginChallenge;

const verify = (challengeId: string, code: string) =>
  completeLoginChallengeMock({ challenge_id: challengeId, method_id: TOTP_METHOD_ID, code });

describe("completeLoginChallengeMock", () => {
  it("issues a token for the right code", async () => {
    const { challenge_id } = await startChallenge();

    await expect(verify(challenge_id, mfaCode)).resolves.toMatchObject({ user_email: email });
  });

  it("consumes the challenge on success, so the same challenge answers 404 afterwards", async () => {
    const { challenge_id } = await startChallenge();
    await verify(challenge_id, mfaCode);

    await expect(verify(challenge_id, mfaCode)).rejects.toMatchObject({
      status: 404,
      errorCode: AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND
    });
  });

  it("answers a wrong code with 403 and one attempt fewer, filled into the reason too", async () => {
    const { challenge_id, attempts_left } = await startChallenge();

    await expect(verify(challenge_id, "000000")).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.INVALID_MFA_CODE,
      params: [attempts_left - 1],
      message: `Invalid verification code. ${attempts_left - 1} attempts left`
    });
  });

  it("locks the challenge on the last wrong code, and nothing gets through it after that", async () => {
    const { challenge_id } = await startChallenge(SIGN_IN_SCENARIO.MFA_LAST_ATTEMPT);

    await expect(verify(challenge_id, "000000")).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.MFA_ATTEMPTS_EXCEEDED
    });
    await expect(verify(challenge_id, mfaCode)).rejects.toMatchObject({ status: 404 });
  });

  it("answers an expired challenge with 404 even for the right code", async () => {
    const { challenge_id } = await startChallenge(SIGN_IN_SCENARIO.MFA_EXPIRING);
    vi.useFakeTimers({ now: Date.now() + (MOCK_LOGIN_CHALLENGE.SHORT_TTL_SECONDS + 1) * 1000 });

    await expect(verify(challenge_id, mfaCode)).rejects.toMatchObject({ status: 404 });

    vi.useRealTimers();
  });

  it("answers an unknown challenge with 404", async () => {
    await expect(verify("not-a-challenge", mfaCode)).rejects.toMatchObject({ status: 404 });
  });
});
