import { describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, CREATE_TOKEN_STATUS, LOGIN_CHALLENGE_STATE } from "@theme/api/auth/signIn/constants";
import { MOCKED_ROUTES } from "./handlers";

vi.mock("@theme/api/mocked/mockDelay", () => ({ MOCK_LATENCY_MS: 0, delay: () => Promise.resolve() }));

const call = (route: string, body: Record<string, string>) => MOCKED_ROUTES[route](body);

const SIGN_IN = { email: "mfa.user@example.com", password: "password" };

describe("MOCKED_ROUTES", () => {
  it("answers login_options with 200 and the options as the body", async () => {
    const { status, body } = await call("POST /auth/v2/login_options", { email: SIGN_IN.email });

    expect(status).toBe(200);
    expect(body).toEqual({ methods: ["password"], sso: { state: "not_configured" } });
  });

  it("maps the challenge outcome onto the HTTP status, so the app can branch on it", async () => {
    const { status, body } = await call("POST /auth/v2/tokens", SIGN_IN);

    expect(status).toBe(CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED);
    expect(body).toMatchObject({ state: LOGIN_CHALLENGE_STATE.MFA_REQUIRED });
  });

  it("rebuilds the optscale error envelope a rejected mock would have sent over the wire", async () => {
    const { status, body } = await call("POST /auth/v2/tokens", { ...SIGN_IN, password: "wrong-password" });

    expect(status).toBe(403);
    expect(body).toEqual({
      error: { error_code: AUTH_ERROR_CODE.INVALID_CREDENTIALS, reason: "Email or password is invalid" }
    });
  });

  it("keys every route the way the plugin builds its lookup — method, space, path without /api", () => {
    expect(Object.keys(MOCKED_ROUTES).every((route) => /^[A-Z]+ \/auth\/v2\/[a-z_]+$/.test(route))).toBe(true);
  });
});
