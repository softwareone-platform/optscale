import { describe, expect, it } from "vitest";
import { AUTH_POLICY_PURPOSE, AUTH_POLICY_SCOPE_TYPE } from "api/auth/authPolicies/constants";
import { AUTH_ERROR_CODE } from "api/auth/errors";
import { MOCK_AUTH_POLICY } from "api/mocked/config";
import { createAuthPolicyMock, deleteAuthPolicyMock, listAuthPoliciesMock } from "./authPoliciesMock";

const TOKEN = "MDAxY";

// The store outlives each test, like the dev server's; a fresh organization keeps every test on its own rows.
let organizationCount = 0;
const newScope = () => {
  organizationCount += 1;
  return { scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION, scope_id: `org-${organizationCount}` };
};

const scopeOf = (scope_id: string) => ({ scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION, scope_id });

describe("the mocked organization policies", () => {
  it("lists a created policy for its organization only", async () => {
    const scope = newScope();
    const policy = await createAuthPolicyMock({ token: TOKEN, ...scope, purpose: AUTH_POLICY_PURPOSE.MFA });

    await expect(listAuthPoliciesMock({ token: TOKEN, ...scope })).resolves.toEqual({ auth_policies: [policy] });
    await expect(listAuthPoliciesMock({ token: TOKEN, ...newScope() })).resolves.toEqual({ auth_policies: [] });
  });

  it("answers 409 to a second policy with the same purpose", async () => {
    const scope = newScope();
    await createAuthPolicyMock({ token: TOKEN, ...scope, purpose: AUTH_POLICY_PURPOSE.MFA });

    await expect(createAuthPolicyMock({ token: TOKEN, ...scope, purpose: AUTH_POLICY_PURPOSE.MFA })).rejects.toMatchObject({
      status: 409,
      errorCode: AUTH_ERROR_CODE.AUTH_POLICY_EXISTS
    });
  });

  it("stops enforcing once the policy is deleted", async () => {
    const scope = newScope();
    const { id } = await createAuthPolicyMock({ token: TOKEN, ...scope, purpose: AUTH_POLICY_PURPOSE.MFA });

    await deleteAuthPolicyMock({ token: TOKEN, policyId: id });

    await expect(listAuthPoliciesMock({ token: TOKEN, ...scope })).resolves.toEqual({ auth_policies: [] });
  });

  it("answers 404 naming the policy that does not exist", async () => {
    await expect(deleteAuthPolicyMock({ token: TOKEN, policyId: "missing" })).rejects.toMatchObject({
      status: 404,
      errorCode: AUTH_ERROR_CODE.NOT_FOUND,
      message: "AuthPolicy missing not found"
    });
  });

  it("answers 401 without a token", async () => {
    await expect(listAuthPoliciesMock({ token: "", ...newScope() })).rejects.toMatchObject({
      status: 401,
      errorCode: AUTH_ERROR_CODE.TOKEN_REQUIRED
    });
  });

  it("answers 400 naming scope_type for a domain policy, which waits for SSO", async () => {
    const domainScope = { scope_type: AUTH_POLICY_SCOPE_TYPE.DOMAIN, scope_id: "example.com" };

    await expect(
      createAuthPolicyMock({ token: TOKEN, ...domainScope, purpose: AUTH_POLICY_PURPOSE.MFA })
    ).rejects.toMatchObject({ status: 400, errorCode: AUTH_ERROR_CODE.INVALID_VALUE, message: "Invalid scope_type" });
    await expect(listAuthPoliciesMock({ token: TOKEN, ...domainScope })).rejects.toMatchObject({ status: 400 });
  });

  it("answers 404 naming an organization the service does not know, to listing and creating alike", async () => {
    const scope = scopeOf(MOCK_AUTH_POLICY.UNKNOWN_ORGANIZATION_ID);

    await expect(listAuthPoliciesMock({ token: TOKEN, ...scope })).rejects.toMatchObject({
      status: 404,
      errorCode: AUTH_ERROR_CODE.RESOURCE_NOT_FOUND,
      message: `organization with id ${MOCK_AUTH_POLICY.UNKNOWN_ORGANIZATION_ID} was not found`
    });
    await expect(createAuthPolicyMock({ token: TOKEN, ...scope, purpose: AUTH_POLICY_PURPOSE.MFA })).rejects.toMatchObject({
      status: 404
    });
  });

  it("shows a member the policy of an organization they do not manage, and answers 403 to changing it", async () => {
    const scope = scopeOf(MOCK_AUTH_POLICY.NOT_MANAGED_ORGANIZATION_ID);

    const {
      auth_policies: [policy]
    } = await listAuthPoliciesMock({ token: TOKEN, ...scope });

    expect(policy).toMatchObject({ purpose: AUTH_POLICY_PURPOSE.MFA, deleted_at: 0 });
    await expect(deleteAuthPolicyMock({ token: TOKEN, policyId: policy.id })).rejects.toMatchObject({
      status: 403,
      errorCode: AUTH_ERROR_CODE.FORBIDDEN
    });
    await expect(createAuthPolicyMock({ token: TOKEN, ...scope, purpose: AUTH_POLICY_PURPOSE.SSO })).rejects.toMatchObject({
      status: 403
    });
  });
});
