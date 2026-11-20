import { beforeEach, describe, expect, it, vi } from "vitest";
import { MFA_METHOD_TYPE } from "api/auth/mfaMethod";
import {
  confirmChallengeEnrollment,
  confirmMfaEnrollment,
  deleteMfaMethod,
  getMfaStatus,
  resetMfa,
  startChallengeEnrollment,
  startMfaEnrollment,
  updateMfaMethod
} from "./mfaMethods";

const mockRequestAuth = vi.fn();

vi.mock("../request", () => ({ requestAuth: (path: string, options: unknown) => mockRequestAuth(path, options) }));

const USER = { token: "MDAxY", userId: "9c2a" };

/** Where the wire contract is written down: a typo in a path is a silent 404, a renamed body field a silent 400. */
describe("the MFA methods endpoints", () => {
  beforeEach(() => {
    mockRequestAuth.mockReset().mockResolvedValue({ status: 200, data: { id: "a1d3" } });
  });

  it.each([
    {
      name: "getMfaStatus",
      call: () => getMfaStatus(USER),
      path: "/users/9c2a/mfa_methods",
      options: { method: "GET", token: "MDAxY" }
    },
    {
      name: "startMfaEnrollment",
      call: () => startMfaEnrollment({ ...USER, type: MFA_METHOD_TYPE.TOTP, label: "Pixel" }),
      path: "/users/9c2a/mfa_methods",
      options: { body: { type: "totp", label: "Pixel" }, token: "MDAxY" }
    },
    {
      name: "confirmMfaEnrollment",
      call: () => confirmMfaEnrollment({ ...USER, methodId: "a1d3", code: "482913" }),
      path: "/users/9c2a/mfa_methods/a1d3/confirm",
      options: { body: { code: "482913" }, token: "MDAxY" }
    },
    {
      name: "updateMfaMethod",
      call: () => updateMfaMethod({ ...USER, methodId: "a1d3", is_default: true }),
      path: "/users/9c2a/mfa_methods/a1d3",
      options: { method: "PATCH", body: { is_default: true, label: undefined }, token: "MDAxY" }
    },
    {
      name: "deleteMfaMethod",
      call: () => deleteMfaMethod({ ...USER, methodId: "a1d3" }),
      path: "/users/9c2a/mfa_methods/a1d3",
      options: { method: "DELETE", token: "MDAxY" }
    },
    {
      name: "resetMfa",
      call: () => resetMfa(USER),
      path: "/users/9c2a/mfa_methods",
      options: { method: "DELETE", token: "MDAxY" }
    }
  ])("$name calls its path with the user's token", async ({ call, path, options }) => {
    await call();

    expect(mockRequestAuth).toHaveBeenCalledWith(path, options);
  });

  it.each([
    {
      name: "startChallengeEnrollment",
      call: () => startChallengeEnrollment({ userId: "9c2a", challengeId: "6d2f", type: MFA_METHOD_TYPE.EMAIL }),
      path: "/users/9c2a/mfa_methods",
      body: { type: "email", label: undefined, challenge_id: "6d2f" }
    },
    {
      name: "confirmChallengeEnrollment",
      call: () => confirmChallengeEnrollment({ userId: "9c2a", challengeId: "6d2f", methodId: "a1d3", code: "482913" }),
      path: "/users/9c2a/mfa_methods/a1d3/confirm",
      body: { code: "482913", challenge_id: "6d2f" }
    }
  ])("$name calls the same path with the challenge in the body and no token", async ({ call, path, body }) => {
    await call();

    expect(mockRequestAuth).toHaveBeenCalledWith(path, { body });
  });

  it("escapes ids, so one with a slash cannot reach another route", async () => {
    await deleteMfaMethod({ ...USER, methodId: "a/b" });

    expect(mockRequestAuth).toHaveBeenCalledWith("/users/9c2a/mfa_methods/a%2Fb", expect.anything());
  });

  it("unwraps the body for the calls that answer one", async () => {
    await expect(getMfaStatus(USER)).resolves.toEqual({ id: "a1d3" });
  });
});
