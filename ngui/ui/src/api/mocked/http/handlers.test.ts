import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE } from "api/auth/errors";
import { CREATE_TOKEN_STATUS, LOGIN_CHALLENGE_STATE } from "api/auth/signIn/constants";
import { SECURITY_SCENARIO } from "api/mocked/auth/mfaMethods/scenarios";
import { TOKEN_BODY, TOTP_METHOD_ID } from "api/mocked/auth/signIn/fixtures";
import { SIGN_IN_SCENARIO } from "api/mocked/auth/signIn/scenarios";
import {
  MOCK_LATENCY_MS,
  MOCK_SIGN_IN_CREDENTIALS,
  MOCKED_REAL_SESSION_PATH,
  SECURITY_SCENARIO_COOKIE,
  SIGN_IN_SCENARIO_COOKIE
} from "api/mocked/config";
import { delay } from "api/mocked/mockDelay";
import { resetMockState } from "api/mocked/state/mockState";
import { findMockedHandler, MockedRequest } from "./handlers";

vi.mock("api/mocked/mockDelay", () => ({ delay: vi.fn(() => Promise.resolve()) }));

const SIGN_IN = { ...MOCK_SIGN_IN_CREDENTIALS };

const SIGNED_IN = "Bearer MDAxY";

const call = (method: string, path: string, request: Partial<MockedRequest> & { cookie?: string } = {}) => {
  const { cookie = "", ...rest } = request;
  const handle = findMockedHandler({ method, path, cookie });

  if (!handle) {
    throw new Error(`${method} ${path} is not mocked`);
  }

  return handle({ body: {}, query: {}, authorization: "", ...rest });
};

const securityCookie = (scenario: string) => `${SECURITY_SCENARIO_COOKIE}=${scenario}`;

afterEach(resetMockState);

describe("findMockedHandler — sign-in", () => {
  it("answers login_options with 200 and the options as the body", async () => {
    const { status, body } = await call("POST", "/auth/v2/login_options", { body: { email: SIGN_IN.email } });

    expect(status).toBe(200);
    expect(body).toEqual({ methods: ["password"], sso: { state: "not_configured" } });
  });

  it("answers tokens with the scenario the dev panel stored in the cookie", async () => {
    const { status, body } = await call("POST", "/auth/v2/tokens", {
      body: SIGN_IN,
      cookie: `theme=dark; ${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT}`
    });

    expect(status).toBe(CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED);
    expect(body).toMatchObject({ state: LOGIN_CHALLENGE_STATE.MFA_REQUIRED });
  });

  it("issues a token when no scenario cookie is present", async () => {
    const { status } = await call("POST", "/auth/v2/tokens", { body: SIGN_IN });

    expect(status).toBe(CREATE_TOKEN_STATUS.TOKEN_ISSUED);
  });

  it("routes a body with a challenge to MFA verification and answers 201 for the right code", async () => {
    const { body: challenge } = await call("POST", "/auth/v2/tokens", {
      body: SIGN_IN,
      cookie: `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT}`
    });
    const { challenge_id } = challenge as { challenge_id: string };

    const { status } = await call("POST", "/auth/v2/tokens", {
      body: { challenge_id, method_id: TOTP_METHOD_ID, code: MOCK_SIGN_IN_CREDENTIALS.mfaCode }
    });

    expect(status).toBe(201);
  });

  it("reads an e-mailed code from verification_code and puts it through the same challenge", async () => {
    const { status, body } = await call("POST", "/auth/v2/tokens", {
      body: { email: SIGN_IN.email, verification_code: SIGN_IN.verificationCode },
      cookie: `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT}`
    });

    expect(status).toBe(CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED);
    expect(body).toMatchObject({ state: LOGIN_CHALLENGE_STATE.MFA_REQUIRED });
  });

  it.each([
    ["POST", "/auth/v2/tokens"],
    ["POST", "/auth/v2/login_challenges/6d2f/codes"],
    ["GET", "/auth/v2/users/9c2a/mfa_methods"],
    ["PATCH", "/auth/v2/users/9c2a"],
    ["GET", "/auth/v2/auth_policies"]
  ])("leaves %s %s to the real auth service under the real sign-in scenario", (method, path) => {
    const cookie = `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.REAL_SIGN_IN}`;

    expect(findMockedHandler({ method, path, cookie })).toBeUndefined();
  });

  it("keeps answering login_options and its own session routes under the real sign-in scenario", () => {
    const cookie = `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.REAL_SIGN_IN}`;

    expect(findMockedHandler({ method: "POST", path: "/auth/v2/login_options", cookie })).toBeDefined();
    expect(findMockedHandler({ method: "GET", path: `/auth/v2${MOCKED_REAL_SESSION_PATH}`, cookie })).toBeDefined();
  });

  it("answers a challenge code request with 204 and no body, then 403 within the minute", async () => {
    const { body: challenge } = await call("POST", "/auth/v2/tokens", {
      body: SIGN_IN,
      cookie: `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT}`
    });
    const path = `/auth/v2/login_challenges/${(challenge as { challenge_id: string }).challenge_id}/codes`;

    const first = await call("POST", path, { body: { method_id: "b2e4" } });
    const second = await call("POST", path, { body: { method_id: "b2e4" } });

    expect(first).toEqual({ status: 204, body: undefined });
    expect(second).toMatchObject({ status: 403, body: { error: { error_code: AUTH_ERROR_CODE.CODE_REQUESTED_TOO_SOON } } });
  });

  it("rebuilds the optscale error envelope a rejected mock would have sent over the wire", async () => {
    const { status, body } = await call("POST", "/auth/v2/tokens", { body: { ...SIGN_IN, password: "wrong-password" } });

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
});

describe("findMockedHandler — the real session", () => {
  const REAL_SESSION = { token: "MDAxY-real", user_id: "9c2a", user_email: "reto.mayer@example.com" };

  it("stores a captured session and reports it without the token", async () => {
    await call("POST", "/auth/v2/__mocked__/session", { body: REAL_SESSION });

    const { status, body } = await call("GET", "/auth/v2/__mocked__/session");

    expect(status).toBe(200);
    expect(body).toEqual({
      session: { user_id: "9c2a", user_email: "reto.mayer@example.com", captured_at: expect.any(Number) }
    });
  });

  it("makes a mocked sign-in hand out the real token, and the file's macaroon once forgotten", async () => {
    await call("POST", "/auth/v2/__mocked__/session", { body: REAL_SESSION });
    const { body: withSession } = await call("POST", "/auth/v2/tokens", { body: SIGN_IN });

    await call("DELETE", "/auth/v2/__mocked__/session");
    const { body: withoutSession } = await call("POST", "/auth/v2/tokens", { body: SIGN_IN });

    expect(withSession).toMatchObject(REAL_SESSION);
    expect(withoutSession).toMatchObject({ token: TOKEN_BODY.token, user_email: SIGN_IN.email });
  });

  it("hands the real token out at the end of a mocked MFA challenge too", async () => {
    await call("POST", "/auth/v2/__mocked__/session", { body: REAL_SESSION });
    const { body: challenge } = await call("POST", "/auth/v2/tokens", {
      body: SIGN_IN,
      cookie: `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT}`
    });

    const { body } = await call("POST", "/auth/v2/tokens", {
      body: {
        challenge_id: (challenge as { challenge_id: string }).challenge_id,
        method_id: TOTP_METHOD_ID,
        code: MOCK_SIGN_IN_CREDENTIALS.mfaCode
      }
    });

    expect(body).toMatchObject({ token: REAL_SESSION.token, user_id: REAL_SESSION.user_id });
  });

  it("answers 400 naming a missing field instead of storing half a session", async () => {
    const { status, body } = await call("POST", "/auth/v2/__mocked__/session", { body: { token: "MDAxY-real" } });

    expect(status).toBe(400);
    expect(body).toMatchObject({ error: { reason: "Invalid user_id" } });
  });
});

describe("findMockedHandler — MFA methods", () => {
  it("reads the user id from the path and the starting point from the security scenario cookie", async () => {
    const { status, body } = await call("GET", "/auth/v2/users/route-user-1/mfa_methods", {
      authorization: SIGNED_IN,
      cookie: securityCookie(SECURITY_SCENARIO.TOTP_ONLY)
    });

    expect(status).toBe(200);
    expect(body).toMatchObject({ status: "configured", methods: [{ type: "totp" }] });
  });

  it("answers 401 without a bearer token", async () => {
    const { status, body } = await call("GET", "/auth/v2/users/route-user-2/mfa_methods");

    expect(status).toBe(401);
    expect(body).toMatchObject({ error: { error_code: AUTH_ERROR_CODE.TOKEN_REQUIRED } });
  });

  it("answers 400 naming the field for a method type the contract does not know", async () => {
    const { status, body } = await call("POST", "/auth/v2/users/route-user-3/mfa_methods", {
      authorization: SIGNED_IN,
      body: { type: "sms" }
    });

    expect(status).toBe(400);
    expect(body).toMatchObject({ error: { error_code: AUTH_ERROR_CODE.INVALID_VALUE, reason: "Invalid type" } });
  });

  it("takes the method id from a nested path and the PATCH body's boolean", async () => {
    const request = { authorization: SIGNED_IN, cookie: securityCookie(SECURITY_SCENARIO.TOTP_AND_EMAIL) };
    const { body: status } = await call("GET", "/auth/v2/users/route-user-4/mfa_methods", request);
    const emailMethod = (status as { methods: { id: string; type: string }[] }).methods.find(({ type }) => type === "email");

    const { body } = await call("PATCH", `/auth/v2/users/route-user-4/mfa_methods/${emailMethod?.id}`, {
      ...request,
      body: { is_default: true }
    });

    expect(body).toMatchObject({ id: emailMethod?.id, is_default: true });
  });

  it("answers a removed method with 204 and no body", async () => {
    const request = { authorization: SIGNED_IN, cookie: securityCookie(SECURITY_SCENARIO.TOTP_ONLY) };
    const { body: status } = await call("GET", "/auth/v2/users/route-user-5/mfa_methods", request);
    const [method] = (status as { methods: { id: string }[] }).methods;

    await expect(call("DELETE", `/auth/v2/users/route-user-5/mfa_methods/${method.id}`, request)).resolves.toEqual({
      status: 204,
      body: undefined
    });
  });
});

describe("findMockedHandler — enrolling during sign-in", () => {
  const enrollmentRequired = async () => {
    const { body } = await call("POST", "/auth/v2/tokens", {
      body: SIGN_IN,
      cookie: `${SIGN_IN_SCENARIO_COOKIE}=${SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED}`
    });
    const { challenge_id, user_id } = body as { challenge_id: string; user_id: string };

    return { challenge_id, path: `/auth/v2/users/${user_id}/mfa_methods` };
  };

  it("takes no MFA code on an enrollment_required challenge, since there is no method to check it against", async () => {
    const { challenge_id } = await enrollmentRequired();

    const { status, body } = await call("POST", "/auth/v2/tokens", {
      body: { challenge_id, method_id: TOTP_METHOD_ID, code: MOCK_SIGN_IN_CREDENTIALS.mfaCode }
    });

    expect(status).toBe(403);
    expect(body).toMatchObject({ error: { error_code: AUTH_ERROR_CODE.MFA_ENROLLMENT_REQUIRED } });
  });

  it("starts a method with the challenge in place of the token and answers 201 {method, token} once confirmed", async () => {
    const { challenge_id, path } = await enrollmentRequired();

    const { status: startStatus, body: enrollment } = await call("POST", path, { body: { type: "totp", challenge_id } });
    const { id } = enrollment as { id: string };
    const { status, body } = await call("POST", `${path}/${id}/confirm`, {
      body: { code: MOCK_SIGN_IN_CREDENTIALS.mfaCode, challenge_id }
    });

    expect(startStatus).toBe(201);
    expect(status).toBe(201);
    expect(body).toMatchObject({ method: { id, confirmed: true, is_default: true }, token: { user_email: SIGN_IN.email } });
  });

  it("answers a wrong code with the challenge's attempts left", async () => {
    const { challenge_id, path } = await enrollmentRequired();
    const { body: enrollment } = await call("POST", path, { body: { type: "totp", challenge_id } });

    const { status, body } = await call("POST", `${path}/${(enrollment as { id: string }).id}/confirm`, {
      body: { code: "000000", challenge_id }
    });

    expect(status).toBe(403);
    expect(body).toMatchObject({ error: { error_code: AUTH_ERROR_CODE.INVALID_MFA_CODE, params: [4] } });
  });

  it("answers 404 for a challenge sent under another user's path", async () => {
    const { challenge_id } = await enrollmentRequired();

    const { status, body } = await call("POST", "/auth/v2/users/someone-else/mfa_methods", {
      body: { type: "totp", challenge_id }
    });

    expect(status).toBe(404);
    expect(body).toMatchObject({ error: { error_code: AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND } });
  });

  it("answers 404 once the challenge is spent, so it cannot add a second method", async () => {
    const { challenge_id, path } = await enrollmentRequired();
    const { body: enrollment } = await call("POST", path, { body: { type: "email", challenge_id } });
    await call("POST", `${path}/${(enrollment as { id: string }).id}/confirm`, {
      body: { code: MOCK_SIGN_IN_CREDENTIALS.mfaCode, challenge_id }
    });

    const { status, body } = await call("POST", path, { body: { type: "totp", challenge_id } });

    expect(status).toBe(404);
    expect(body).toMatchObject({ error: { error_code: AUTH_ERROR_CODE.LOGIN_CHALLENGE_NOT_FOUND } });
  });
});

describe("findMockedHandler — users", () => {
  it("lets the next sign-in use the password a recovery set, and no longer the old one", async () => {
    const { status } = await call("PATCH", "/auth/v2/users/9c2a", {
      body: { password: "n3w-Passw0rd" },
      authorization: SIGNED_IN
    });

    const signIn = (password: string) => call("POST", "/auth/v2/tokens", { body: { email: SIGN_IN.email, password } });

    expect(status).toBe(200);
    expect(await signIn("n3w-Passw0rd")).toMatchObject({ status: CREATE_TOKEN_STATUS.TOKEN_ISSUED });
    expect(await signIn(SIGN_IN.password)).toMatchObject({ status: 403, body: { error: { error_code: "OA0037" } } });
  });

  it("answers 401 without a bearer token", async () => {
    const { status } = await call("PATCH", "/auth/v2/users/9c2a", { body: { password: "n3w-Passw0rd" } });

    expect(status).toBe(401);
  });
});

describe("findMockedHandler — organization policies", () => {
  it("reads the scope from the query string and answers the list wrapped, as the service does", async () => {
    const scope = { scope_type: "organization", scope_id: "route-org-1" };
    await call("POST", "/auth/v2/auth_policies", { authorization: SIGNED_IN, body: { ...scope, purpose: "mfa" } });

    const { status, body } = await call("GET", "/auth/v2/auth_policies", { authorization: SIGNED_IN, query: scope });

    expect(status).toBe(200);
    expect(body).toMatchObject({ auth_policies: [{ ...scope, purpose: "mfa" }] });
  });

  it("answers 400 for a purpose the contract does not know", async () => {
    const { status } = await call("POST", "/auth/v2/auth_policies", {
      authorization: SIGNED_IN,
      body: { scope_type: "organization", scope_id: "route-org-2", purpose: "password" }
    });

    expect(status).toBe(400);
  });
});

describe("findMockedHandler — matching", () => {
  it.each([
    ["GET", "/auth/v2/tokens"],
    ["POST", "/auth/v2/users/u1/mfa_methods/m1"],
    ["POST", "/auth/v2/users/u1/mfa_methods/m1/confirm/extra"],
    ["GET", "/auth/v2/datasources"]
  ])("lets %s %s through to the real backend", (method, path) => {
    expect(findMockedHandler({ method, path, cookie: "" })).toBeUndefined();
  });
});

describe("findMockedHandler — latency", () => {
  beforeEach(() => vi.mocked(delay).mockClear());

  it("holds a service route for the mock latency, a refused request included", async () => {
    await call("POST", "/auth/v2/login_options", { body: { email: SIGN_IN.email } });
    await call("GET", "/auth/v2/users/u1/mfa_methods");

    expect(vi.mocked(delay).mock.calls).toEqual([[MOCK_LATENCY_MS], [MOCK_LATENCY_MS]]);
  });

  it("answers the mock's own session route at once", async () => {
    await call("GET", `/auth/v2${MOCKED_REAL_SESSION_PATH}`);

    expect(delay).not.toHaveBeenCalled();
  });
});
