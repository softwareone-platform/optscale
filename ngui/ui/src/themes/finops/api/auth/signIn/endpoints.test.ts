import { describe, expect, it, vi } from "vitest";
import { CREATE_TOKEN_STATUS, LOGIN_METHOD } from "./constants";
import { createToken } from "./createToken";
import { resolveLoginOptions } from "./loginOptions";

const mockPostAuth = vi.fn();

vi.mock("./request", () => ({ postAuth: (path: string, body: unknown) => mockPostAuth(path, body) }));

/**
 * These two are one-liners, but they are where the wire contract is written down: a typo in the
 * path is a silent 404, and a renamed body field is a silent 400.
 */
describe("the sign-in endpoints", () => {
  it("posts the credentials to /tokens and hands the status through, because sign-in branches on it", async () => {
    mockPostAuth.mockResolvedValue({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: { state: "mfa_required" } });

    const response = await createToken({ email: "finops.ffc@example.com", password: "•••" });

    expect(mockPostAuth).toHaveBeenCalledWith("/tokens", { email: "finops.ffc@example.com", password: "•••" });
    expect(response).toEqual({ status: CREATE_TOKEN_STATUS.CHALLENGE_REQUIRED, data: { state: "mfa_required" } });
  });

  it("posts only the address to /login_options and unwraps the body, since the status carries nothing", async () => {
    mockPostAuth.mockResolvedValue({ status: 200, data: { methods: [LOGIN_METHOD.PASSWORD], sso: { state: "x" } } });

    const options = await resolveLoginOptions({ email: "finops.ffc@example.com" });

    expect(mockPostAuth).toHaveBeenCalledWith("/login_options", { email: "finops.ffc@example.com" });
    expect(options).toEqual({ methods: [LOGIN_METHOD.PASSWORD], sso: { state: "x" } });
  });

  it("lets a rejection through untouched, so the caller still sees the AuthApiError", async () => {
    const rejection = new Error("boom");
    mockPostAuth.mockRejectedValue(rejection);

    await expect(createToken({ email: "a@b.com", password: "x" })).rejects.toBe(rejection);
    await expect(resolveLoginOptions({ email: "a@b.com" })).rejects.toBe(rejection);
  });
});
