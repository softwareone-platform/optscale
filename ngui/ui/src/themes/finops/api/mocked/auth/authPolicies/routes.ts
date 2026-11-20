import { AUTH_POLICY_PURPOSE, AUTH_POLICY_SCOPE_TYPE } from "@theme/api/auth/authPolicies/constants";
import { created, enumReader, MockedRoute, noContent, ok, readString, readToken } from "@theme/api/mocked/http/router";
import { createAuthPolicyMock, deleteAuthPolicyMock, listAuthPoliciesMock } from "./authPoliciesMock";
import { ERROR_BODY } from "./fixtures";

const readScopeType = enumReader(AUTH_POLICY_SCOPE_TYPE, "scope_type", ERROR_BODY.INVALID_VALUE);

const readPurpose = enumReader(AUTH_POLICY_PURPOSE, "purpose", ERROR_BODY.INVALID_VALUE);

export const AUTH_POLICIES_ROUTES: MockedRoute[] = [
  {
    method: "GET",
    path: "/auth/v2/auth_policies",
    handle: async (request) =>
      ok(
        await listAuthPoliciesMock({
          token: readToken(request),
          scope_type: readScopeType(request.query.scope_type),
          scope_id: readString(request.query.scope_id)
        })
      )
  },
  {
    method: "POST",
    path: "/auth/v2/auth_policies",
    handle: async (request) =>
      created(
        await createAuthPolicyMock({
          token: readToken(request),
          scope_type: readScopeType(request.body.scope_type),
          scope_id: readString(request.body.scope_id),
          purpose: readPurpose(request.body.purpose)
        })
      )
  },
  {
    method: "DELETE",
    path: "/auth/v2/auth_policies/:policy_id",
    handle: async (request) => {
      await deleteAuthPolicyMock({ token: readToken(request), policyId: request.params.policy_id });

      return noContent();
    }
  }
];
