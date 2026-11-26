import { requestAuth } from "../request";
import { AuthPolicy, AuthPolicyList, CreateAuthPolicy, DeleteAuthPolicy, ListAuthPolicies } from "./types";

/**
 * `/auth/v2/auth_policies` — an organization's authentication policy; an `mfa` one enforces MFA for its
 * members. Any organization role may read it, only a manager may change it.
 */

export const listAuthPolicies: ListAuthPolicies = async ({ token, scope_type, scope_id }) => {
  const query = new URLSearchParams({ scope_type, scope_id });
  const { data } = await requestAuth<AuthPolicyList>(`/auth_policies?${query}`, { method: "GET", token });

  return data.auth_policies;
};

/** `201`; `409` when the scope already has a policy for this purpose. */
export const createAuthPolicy: CreateAuthPolicy = async ({ token, scope_type, scope_id, purpose }) => {
  const { data } = await requestAuth<AuthPolicy>("/auth_policies", { body: { scope_type, scope_id, purpose }, token });

  return data;
};

export const deleteAuthPolicy: DeleteAuthPolicy = async ({ token, policyId }) => {
  await requestAuth(`/auth_policies/${encodeURIComponent(policyId)}`, { method: "DELETE", token });
};
