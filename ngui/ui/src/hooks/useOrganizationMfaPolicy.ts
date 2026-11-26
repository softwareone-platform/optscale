import { useCallback } from "react";
import {
  AUTH_POLICY_PURPOSE,
  AUTH_POLICY_SCOPE_TYPE,
  createAuthPolicy,
  deleteAuthPolicy,
  listAuthPolicies,
} from "api/auth/authPolicies";
import { useGetToken } from "hooks/useGetToken";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { useSignOutOnUnauthorized } from "hooks/useSignOutOnUnauthorized";
import { useFetchedResource } from "./useFetchedResource";

/** Whether the current organization enforces MFA — it does while it has an `mfa` policy — and the two ways to change it. */
export const useOrganizationMfaPolicy = () => {
  const { token } = useGetToken();
  const { organizationId } = useOrganizationInfo();
  const signOutOnUnauthorized = useSignOutOnUnauthorized();

  const fetchPolicies = useCallback(
    () =>
      signOutOnUnauthorized(
        listAuthPolicies({ token, scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION, scope_id: organizationId })
      ),
    [token, organizationId, signOutOnUnauthorized]
  );

  const { status, data: policies, refetch } = useFetchedResource(fetchPolicies);

  const mfaPolicyId = policies?.find(({ purpose }) => purpose === AUTH_POLICY_PURPOSE.MFA)?.id;

  const enforce = useCallback(
    () =>
      signOutOnUnauthorized(
        createAuthPolicy({
          token,
          scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION,
          scope_id: organizationId,
          purpose: AUTH_POLICY_PURPOSE.MFA,
        })
      ),
    [token, organizationId, signOutOnUnauthorized]
  );

  const stopEnforcing = useCallback(async () => {
    if (mfaPolicyId) {
      await signOutOnUnauthorized(deleteAuthPolicy({ token, policyId: mfaPolicyId }));
    }
  }, [token, mfaPolicyId, signOutOnUnauthorized]);

  return { status, hasLoaded: policies !== null, isEnforced: mfaPolicyId !== undefined, enforce, stopEnforcing, refetch };
};
