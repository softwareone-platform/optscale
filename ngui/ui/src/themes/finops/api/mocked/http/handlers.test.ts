import { describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, CREATE_TOKEN_STATUS, LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn/constants";
import { TOTP_METHOD_ID } from "@theme/api/mocked/auth/signIn/fixtures";
import { SIGN_IN_SCENARIO } from "@theme/api/mocked/auth/signIn/scenarios";
import { MOCK_SIGN_IN_CREDENTIALS, SIGN_IN_SCENARIO_COOKIE } from "@theme/api/mocked/config";
import { MOCKED_ROUTES } from "./handlers";

vi.mock("@theme/api/mocked/mockDelay", () => ({ delay: () => Promise.resolve() }));

const call = (route: string, body: Record<string, string>, cookie = "") => MOCKED_ROUTES[route](body, { cookie });

const SIGN_IN = { ...MOCK_SIGN_IN_CREDENTIALS };

describe("MOCKED_ROUTES", () => {
  it("answers login_options with 200 and the options as the body", async () => {
    const { status, body } = await call("POST /auth/v2/login_options", { email: SIGN_IN.email });

    expect(status).toBe(200);
    expect(body).toEqual({ methods: ["password"], sso: { state: "not_configured" } });
  });

  it("answers tokens with the scenario the dev panel stored in the cookie", async () => {
    const { status, body } = await call(
      "POST /auth/v2/tokens",
      SIGN_IN,
      `theme=dark; ${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT}`
    );

    expect(status).toBe(CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED);
    expect(body).toMatchObject({ state: LOGIN_CHALLENGE_STATE.MFA_REQUIRED });
  });

  it("issues a token when no scenario cookie is present", async () => {
    const { status } = await call("POST /auth/v2/tokens", SIGN_IN);

    expect(status).toBe(CREATE_TOKEN_STATUS.TOKEN_ISSUED);
  });

  it("routes a body with a challenge to MFA verification and answers 201 for the right code", async () => {
    const { body: challenge } = await call(
      "POST /auth/v2/tokens",
      SIGN_IN,
      `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT}`
    );
    const { challenge_id } = challenge as { challenge_id: string };

    const { status } = await call("POST /auth/v2/tokens", {
      challenge_id,
      method_id: TOTP_METHOD_ID,
      code: MOCK_SIGN_IN_CREDENTIALS.mfaCode
    });

    expect(status).toBe(201);
  });

  it("rebuilds the optscale error envelope a rejected mock would have sent over the wire", async () => {
    const { status, body } = await call("POST /auth/v2/tokens", { ...SIGN_IN, password: "wrong-password" });

    expect(status).toBe(403);
    expect(body).toEqual({
      error: {
        status_code: 403,
        error_code: AUTH_ERROR_CODE.INVALID_CREDENTIALS,
        reason: "Email or password is invalid",
        params: []
      }
    });
  });

  it("keys every route the way the plugin builds its lookup — method, space, path without /api", () => {
    expect(Object.keys(MOCKED_ROUTES).every((route) => /^[A-Z]+ \/auth\/v2\/[a-z_]+$/.test(route))).toBe(true);
  });
});
