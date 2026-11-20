import { describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, CREATE_TOKEN_STATUS, LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn/constants";
import { AuthApiError } from "@theme/api/auth/signIn/errors";
import { AuthToken, LoginChallenge } from "@theme/api/auth/signIn/types";
import macaroon from "utils/macaroons";
import { createTokenMock, MOCK_PASSWORD } from "./createTokenMock";
import { MOCK_USER_ID, TOTP_METHOD_ID } from "./fixtures";

// The latency only exists to make pending states visible in the browser; waiting it out here
// would add ~600 ms per test for nothing.
vi.mock("@theme/api/mocked/mockDelay", () => ({ MOCK_LATENCY_MS: 0, delay: () => Promise.resolve() }));

const signIn = (email: string, password = MOCK_PASSWORD) => createTokenMock({ email, password });

describe("createTokenMock", () => {
  it("issues a token for an account without MFA", async () => {
    const { status, data } = await signIn("finops.ffc@example.com");

    expect(status).toBe(CREATE_TOKEN_STATUS.TOKEN_ISSUED);
    expect(data as AuthToken).toMatchObject({
      user_id: MOCK_USER_ID,
      user_email: "finops.ffc@example.com"
    });
  });

  it("issues a token the app can deserialize as a macaroon", async () => {
    const { data } = await signIn("finops.ffc@example.com");

    const caveats = macaroon.processCaveats(macaroon.deserialize((data as AuthToken).token).getCaveats());

    expect(caveats).toEqual({ mfa: "none" });
  });

  it("answers with an mfa_required challenge when the account has confirmed methods", async () => {
    const { status, data } = await signIn("mfa.user@example.com");
    const challenge = data as LoginChallenge;

    expect(status).toBe(CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED);
    expect(challenge.state).toBe(LOGIN_CHALLENGE_STATE.MFA_REQUIRED);
    expect(challenge.default_method_id).toBe(TOTP_METHOD_ID);
    expect(challenge.methods).toHaveLength(2);
  });

  it("answers with an enrollment_required challenge with no methods to pick from", async () => {
    const { status, data } = await signIn("enroll.user@example.com");
    const challenge = data as LoginChallenge;

    expect(status).toBe(CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED);
    expect(challenge.state).toBe(LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED);
    expect(challenge.default_method_id).toBeNull();
    expect(challenge.methods).toEqual([]);
  });

  it("dates the challenge in the future so the next step can trust expires_at", async () => {
    const { data } = await signIn("mfa.user@example.com");

    expect((data as LoginChallenge).expires_at).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it("rejects a wrong password as invalid credentials", async () => {
    await expect(signIn("finops.ffc@example.com", "wrong-password")).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.INVALID_CREDENTIALS
    });
  });

  it("rejects the generic error scenario with an AuthApiError that is not invalid credentials", async () => {
    await expect(signIn("error.user@example.com")).rejects.toBeInstanceOf(AuthApiError);
    await expect(signIn("error.user@example.com")).rejects.toMatchObject({
      status: 500,
      errorCode: AUTH_ERROR_CODE.INTERNAL_ERROR
    });
  });

  it("matches the scenario regardless of email casing or padding", async () => {
    const { status, data } = await signIn("  MFA.User@Example.com  ");

    expect(status).toBe(CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED);
    expect((data as LoginChallenge).state).toBe(LOGIN_CHALLENGE_STATE.MFA_REQUIRED);
  });
});
