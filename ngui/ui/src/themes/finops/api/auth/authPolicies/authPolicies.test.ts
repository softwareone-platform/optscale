import { beforeEach, describe, expect, it, vi } from "vitest";
import { createAuthPolicy, deleteAuthPolicy, listAuthPolicies } from "./authPolicies";
import { AUTH_POLICY_PURPOSE, AUTH_POLICY_SCOPE_TYPE } from "./constants";

const mockRequestAuth = vi.fn();

vi.mock("../request", () => ({ requestAuth: (path: string, options: unknown) => mockRequestAuth(path, options) }));

const SCOPE = { scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION, scope_id: "4f1e" };

describe("the organization policy endpoints", () => {
  beforeEach(() => {
    mockRequestAuth.mockReset();
  });

  it("lists by scope in the query string and unwraps the service's auth_policies list", async () => {
    const policy = { id: "c7e1", ...SCOPE, purpose: AUTH_POLICY_PURPOSE.MFA, created_at: 1758480000 };
    mockRequestAuth.mockResolvedValue({ status: 200, data: { auth_policies: [policy] } });

    const policies = await listAuthPolicies({ token: "MDAxY", ...SCOPE });

    expect(mockRequestAuth).toHaveBeenCalledWith("/auth_policies?scope_type=organization&scope_id=4f1e", {
      method: "GET",
      token: "MDAxY"
    });
    expect(policies).toEqual([policy]);
  });

  it("creates with the scope and purpose in the body", async () => {
    mockRequestAuth.mockResolvedValue({ status: 201, data: { id: "c7e1" } });

    await createAuthPolicy({ token: "MDAxY", ...SCOPE, purpose: AUTH_POLICY_PURPOSE.MFA });

    expect(mockRequestAuth).toHaveBeenCalledWith("/auth_policies", {
      body: { ...SCOPE, purpose: "mfa" },
      token: "MDAxY"
    });
  });

  it("deletes by policy id", async () => {
    mockRequestAuth.mockResolvedValue({ status: 204, data: null });

    await deleteAuthPolicy({ token: "MDAxY", policyId: "c7e1" });

    expect(mockRequestAuth).toHaveBeenCalledWith("/auth_policies/c7e1", { method: "DELETE", token: "MDAxY" });
  });
});
