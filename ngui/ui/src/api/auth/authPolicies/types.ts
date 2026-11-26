import { ObjectValues } from "utils/types";
import { AUTH_POLICY_PURPOSE, AUTH_POLICY_SCOPE_TYPE } from "./constants";

export type AuthPolicyScopeType = ObjectValues<typeof AUTH_POLICY_SCOPE_TYPE>;

export type AuthPolicyPurpose = ObjectValues<typeof AUTH_POLICY_PURPOSE>;

/** Snake_case: the auth service payload verbatim (the TDR example lacks `id`). */
export type AuthPolicy = {
  id: string;
  scope_type: AuthPolicyScopeType;
  scope_id: string;
  purpose: AuthPolicyPurpose;
  created_at: number;
  /** Always `0` here: the service lists active policies only. */
  deleted_at: number;
};

/** The list endpoint wraps its items. */
export type AuthPolicyList = {
  auth_policies: AuthPolicy[];
};

type PolicyScope = Pick<AuthPolicy, "scope_type" | "scope_id">;

export type ListAuthPoliciesParams = PolicyScope & {
  token: string;
};

export type ListAuthPolicies = (params: ListAuthPoliciesParams) => Promise<AuthPolicy[]>;

export type CreateAuthPolicyParams = PolicyScope &
  Pick<AuthPolicy, "purpose"> & {
    token: string;
  };

export type CreateAuthPolicy = (params: CreateAuthPolicyParams) => Promise<AuthPolicy>;

export type DeleteAuthPolicyParams = {
  token: string;
  policyId: string;
};

export type DeleteAuthPolicy = (params: DeleteAuthPolicyParams) => Promise<void>;
