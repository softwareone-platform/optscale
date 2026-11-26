import { afterEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE, AuthApiError } from "./errors";
import { postAuth, requestAuth } from "./request";

const respondWith = (status: number, body: unknown) => {
  const fetchSpy = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    statusText: "",
    json: () => (body === undefined ? Promise.reject(new SyntaxError("Unexpected end of JSON input")) : Promise.resolve(body)),
  });

  vi.stubGlobal("fetch", fetchSpy);

  return fetchSpy;
};

describe("requestAuth", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends the signed-in user's token as a bearer token, and no body or content type for a GET", async () => {
    const fetchSpy = respondWith(200, { methods: [] });

    await requestAuth("/users/u1/mfa_methods", { method: "GET", token: "MDAxY" });

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringMatching(/\/auth\/v2\/users\/u1\/mfa_methods$/), {
      method: "GET",
      headers: { Authorization: "Bearer MDAxY" },
      body: undefined,
    });
  });

  it("resolves a 204 with no body to null data instead of failing on the empty JSON", async () => {
    respondWith(204, undefined);

    await expect(requestAuth("/users/u1/mfa_methods/m1", { method: "DELETE", token: "MDAxY" })).resolves.toEqual({
      status: 204,
      data: null,
    });
  });
});

describe("postAuth", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("hands the status back alongside the body, because sign-in branches on 201 vs 202", async () => {
    respondWith(202, { state: "mfa_required" });

    await expect(postAuth("/tokens", {})).resolves.toEqual({
      status: 202,
      data: { state: "mfa_required" },
    });
  });

  it("turns the optscale error envelope into an AuthApiError callers can branch on", async () => {
    respondWith(403, { error: { error_code: AUTH_ERROR_CODE.INVALID_CREDENTIALS, reason: "Email or password is invalid" } });

    await expect(postAuth("/tokens", {})).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.INVALID_CREDENTIALS,
      message: "Email or password is invalid",
    });
  });

  it("keeps the envelope's params, which carry values such as the attempts left", async () => {
    respondWith(403, { error: { error_code: AUTH_ERROR_CODE.INVALID_MFA_CODE, reason: "Invalid code", params: [2] } });

    await expect(postAuth("/tokens", {})).rejects.toMatchObject({ params: [2] });
  });

  it("drops params it cannot read rather than pass on a shifted list", async () => {
    respondWith(403, { error: { error_code: AUTH_ERROR_CODE.INVALID_MFA_CODE, reason: "Invalid code", params: [{}, 2] } });

    await expect(postAuth("/tokens", {})).rejects.toMatchObject({ params: [] });
  });

  it("still rejects with an AuthApiError when a gateway answers without the envelope", async () => {
    respondWith(502, null);

    const rejection = postAuth("/tokens", {});

    await expect(rejection).rejects.toBeInstanceOf(AuthApiError);
    await expect(rejection).rejects.toMatchObject({ status: 502, errorCode: "" });
  });
});
