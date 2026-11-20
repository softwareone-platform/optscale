import { v4 as uuidv4 } from "uuid";
import { AUTH_POLICY_SCOPE_TYPE } from "@theme/api/auth/authPolicies/constants";
import {
  AuthPolicy,
  AuthPolicyList,
  AuthPolicyScopeType,
  CreateAuthPolicy,
  DeleteAuthPolicy,
  ListAuthPolicies
} from "@theme/api/auth/authPolicies/types";
import { MOCK_AUTH_POLICY } from "@theme/api/mocked/config";
import { authError } from "@theme/api/mocked/errorBodies";
import { addPolicy, findPolicies, findPolicy, removePolicy } from "@theme/api/mocked/state/authPolicies";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import { CREATED_POLICY_BODY, ERROR_BODY } from "./fixtures";

/**
 * Stand in for `/auth/v2/auth_policies`, checking in the auth service's order: the scope (only `organization` is
 * managed), the organization (unknown → 404), the role (changing a policy takes a manager → 403), then duplicates.
 * The two refused organizations are named in `MOCK_AUTH_POLICY`.
 */

const requireToken = (token: string) => {
  if (!token) {
    throw authError(ERROR_BODY.TOKEN_REQUIRED);
  }
};

// Domain policies wait for SSO; the service answers them as an invalid value.
const requireOrganizationScope = (scopeType: AuthPolicyScopeType) => {
  if (scopeType !== AUTH_POLICY_SCOPE_TYPE.ORGANIZATION) {
    throw authError(ERROR_BODY.INVALID_VALUE, ["scope_type"]);
  }
};

// The service resolves the organization while checking the role, so an unknown one fails before it.
const requireKnownOrganization = (organizationId: string) => {
  if (organizationId === MOCK_AUTH_POLICY.UNKNOWN_ORGANIZATION_ID) {
    throw authError(ERROR_BODY.RESOURCE_NOT_FOUND, [AUTH_POLICY_SCOPE_TYPE.ORGANIZATION, organizationId]);
  }
};

const requireManager = (organizationId: string) => {
  if (organizationId === MOCK_AUTH_POLICY.NOT_MANAGED_ORGANIZATION_ID) {
    throw authError(ERROR_BODY.FORBIDDEN);
  }
};

/** Answers the wire body; the real `listAuthPolicies` unwraps it. */
export const listAuthPoliciesMock = async ({
  token,
  scope_type,
  scope_id
}: Parameters<ListAuthPolicies>[0]): Promise<AuthPolicyList> => {
  requireToken(token);
  requireOrganizationScope(scope_type);
  requireKnownOrganization(scope_id);

  return { auth_policies: findPolicies({ scope_type, scope_id }) };
};

export const createAuthPolicyMock: CreateAuthPolicy = async ({ token, scope_type, scope_id, purpose }) => {
  requireToken(token);
  requireOrganizationScope(scope_type);
  requireKnownOrganization(scope_id);
  requireManager(scope_id);

  if (findPolicies({ scope_type, scope_id }).some((policy) => policy.purpose === purpose)) {
    throw authError(ERROR_BODY.AUTH_POLICY_EXISTS);
  }

  const policy: AuthPolicy = {
    ...CREATED_POLICY_BODY,
    id: uuidv4(),
    created_at: getCurrentUTCTimeInSec(),
    scope_type,
    scope_id,
    purpose
  };

  addPolicy(policy);

  return policy;
};

export const deleteAuthPolicyMock: DeleteAuthPolicy = async ({ token, policyId }) => {
  requireToken(token);

  const policy = findPolicy(policyId);

  if (!policy) {
    throw authError(ERROR_BODY.NOT_FOUND, ["AuthPolicy", policyId]);
  }

  requireManager(policy.scope_id);

  removePolicy(policyId);
};
