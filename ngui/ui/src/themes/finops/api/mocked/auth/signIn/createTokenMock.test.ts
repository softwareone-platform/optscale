import { describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, CREATE_TOKEN_STATUS, LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn/constants";
import { AuthApiError } from "@theme/api/auth/signIn/errors";
import { AuthToken, LoginChallenge } from "@theme/api/auth/signIn/types";
import { MOCK_SIGN_IN_CREDENTIALS } from "@theme/api/mocked/config";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import macaroon from "utils/macaroons";
import { createTokenMock } from "./createTokenMock";
import { EMAIL_METHOD_ID, MOCK_USER_ID, TOTP_METHOD_ID } from "./fixtures";
import { SIGN_IN_SCENARIO, SignInScenario } from "./scenarios";

// The latency only exists to make pending states visible in the browser; waiting it out here
// would add ~600 ms per test for nothing.
vi.mock("@theme/api/mocked/mockDelay", () => ({ delay: () => Promise.resolve() }));

const { email, password } = MOCK_SIGN_IN_CREDENTIALS;

const signIn = (scenario?: SignInScenario) => createTokenMock({ email, password }, scenario);

const challengeFor = async (scenario: SignInScenario) => {
  const { status, data } = await signIn(scenario);

  expect(status).toBe(CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED);

  return data as LoginChallenge;
};

describe("createTokenMock", () => {
  it("issues a token when no scenario was picked, like an account without MFA", async () => {
    const { status, data } = await signIn();

    expect(status).toBe(CREATE_TOKEN_STATUS.TOKEN_ISSUED);
    expect(data as AuthToken).toMatchObject({ user_id: MOCK_USER_ID, user_email: email });
  });

  it("issues a token the app can deserialize as a macaroon", async () => {
    const { data } = await signIn(SIGN_IN_SCENARIO.TOKEN_ISSUED);

    const caveats = macaroon.processCaveats(macaroon.deserialize((data as AuthToken).token).getCaveats());

    expect(caveats).toEqual({ mfa: "none" });
  });

  it("answers mfa_totp_default with the authenticator app as the only default", async () => {
    const challenge = await challengeFor(SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT);

    expect(challenge.state).toBe(LOGIN_CHALLENGE_STATE.MFA_REQUIRED);
    expect(challenge.default_method_id).toBe(TOTP_METHOD_ID);
    expect(challenge.methods.filter(({ is_default }) => is_default).map(({ id }) => id)).toEqual([TOTP_METHOD_ID]);
    expect(challenge.code_sent).toBe(false);
  });

  it("answers mfa_email_default with the e-mail default and its code already sent", async () => {
    const challenge = await challengeFor(SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);

    expect(challenge.default_method_id).toBe(EMAIL_METHOD_ID);
    expect(challenge.methods.find(({ is_default }) => is_default)?.id).toBe(EMAIL_METHOD_ID);
    expect(challenge.code_sent).toBe(true);
  });

  it("fills the per-request fields of the TDR body from the address that signed in", async () => {
    const { data } = await createTokenMock({ email: "reto.mayer@example.com", password }, SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT);
    const challenge = data as LoginChallenge;

    expect(challenge.user_email).toBe("reto.mayer@example.com");
    expect(challenge.methods.find(({ id }) => id === EMAIL_METHOD_ID)?.label).toBe("re***@example.com");
  });

  it("answers mfa_no_default with confirmed methods and nothing marked default", async () => {
    const challenge = await challengeFor(SIGN_IN_SCENARIO.MFA_NO_DEFAULT);

    expect(challenge.default_method_id).toBeNull();
    expect(challenge.methods.some(({ is_default }) => is_default)).toBe(false);
    expect(challenge.methods.every(({ confirmed }) => confirmed)).toBe(true);
  });

  it("answers mfa_no_confirmed_methods with methods the UI must not offer", async () => {
    const challenge = await challengeFor(SIGN_IN_SCENARIO.MFA_NO_CONFIRMED_METHODS);

    expect(challenge.methods.length).toBeGreaterThan(0);
    expect(challenge.methods.some(({ confirmed }) => confirmed)).toBe(false);
  });

  it("answers enrollment_required with no methods to pick from", async () => {
    const challenge = await challengeFor(SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED);

    expect(challenge.state).toBe(LOGIN_CHALLENGE_STATE.ENROLLMENT_REQUIRED);
    expect(challenge.default_method_id).toBeNull();
    expect(challenge.methods).toEqual([]);
  });

  it("dates the challenge in the future so the next step can trust expires_at", async () => {
    const challenge = await challengeFor(SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT);

    expect(challenge.expires_at).toBeGreaterThan(getCurrentUTCTimeInSec());
  });

  it("rejects email_not_verified with OA0073", async () => {
    await expect(signIn(SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED)).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED
    });
  });

  it("rejects internal_error with an AuthApiError that is not invalid credentials", async () => {
    await expect(signIn(SIGN_IN_SCENARIO.INTERNAL_ERROR)).rejects.toBeInstanceOf(AuthApiError);
    await expect(signIn(SIGN_IN_SCENARIO.INTERNAL_ERROR)).rejects.toMatchObject({
      status: 500,
      errorCode: AUTH_ERROR_CODE.INTERNAL_ERROR
    });
  });

  it("rejects a wrong password as invalid credentials whatever the scenario", async () => {
    await expect(
      createTokenMock({ email, password: "wrong-password" }, SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT)
    ).rejects.toMatchObject({ status: 403, errorCode: AUTH_ERROR_CODE.INVALID_CREDENTIALS });
  });
});
