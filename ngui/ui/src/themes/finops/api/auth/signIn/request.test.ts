import { afterEach, describe, expect, it, vi } from "vitest";
import { AUTH_ERROR_CODE } from "./constants";
import { AuthApiError } from "./errors";
import { postAuth } from "./request";

const respondWith = (status: number, body: unknown) => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: status >= 200 && status < 300,
      status,
      statusText: "",
      json: () => Promise.resolve(body)
    })
  );
};

describe("postAuth", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("hands the status back alongside the body, because sign-in branches on 201 vs 202", async () => {
    respondWith(202, { state: "mfa_required" });

    await expect(postAuth("/tokens", {})).resolves.toEqual({
      status: 202,
      data: { state: "mfa_required" }
    });
  });

  it("turns the optscale error envelope into an AuthApiError callers can branch on", async () => {
    respondWith(403, { error: { error_code: AUTH_ERROR_CODE.INVALID_CREDENTIALS, reason: "Email or password is invalid" } });

    await expect(postAuth("/tokens", {})).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.INVALID_CREDENTIALS,
      message: "Email or password is invalid"
    });
  });

  it("still rejects with an AuthApiError when a gateway answers without the envelope", async () => {
    respondWith(502, null);

    const rejection = postAuth("/tokens", {});

    await expect(rejection).rejects.toBeInstanceOf(AuthApiError);
    await expect(rejection).rejects.toMatchObject({ status: 502, errorCode: "" });
  });
});
