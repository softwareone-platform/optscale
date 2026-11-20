import { AUTH_POLICY_PURPOSE } from "api/auth/authPolicies/constants";
import { AuthPolicy } from "api/auth/authPolicies/types";
import { MOCK_AUTH_POLICY } from "api/mocked/config";
import { mockState } from "./mockState";

export const findPolicies = ({ scope_type, scope_id }: Pick<AuthPolicy, "scope_type" | "scope_id">) =>
  mockState.policies.filter((policy) => policy.scope_type === scope_type && policy.scope_id === scope_id);

export const findPolicy = (policyId: string) => mockState.policies.find(({ id }) => id === policyId);

export const addPolicy = (policy: AuthPolicy) => {
  mockState.policies.push(policy);
};

export const removePolicy = (policyId: string) => {
  mockState.policies = mockState.policies.filter(({ id }) => id !== policyId);
};

/**
 * The organizations whose MFA policy binds the mocked users. The mock cannot know who belongs where, so every policy
 * binds everyone — except the not-managed organization's, which would enforce MFA from the start in every scenario.
 */
export const findMfaEnforcingOrganizations = () =>
  mockState.policies
    .filter(
      ({ purpose, scope_id }) =>
        purpose === AUTH_POLICY_PURPOSE.MFA && scope_id !== MOCK_AUTH_POLICY.NOT_MANAGED_ORGANIZATION_ID
    )
    .map(({ scope_id }) => scope_id);
