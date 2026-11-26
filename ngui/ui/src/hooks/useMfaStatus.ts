import { useCallback } from "react";
import { getMfaStatus } from "api/auth/mfaMethods";
import { useGetToken } from "hooks/useGetToken";
import { useSignOutOnUnauthorized } from "hooks/useSignOutOnUnauthorized";
import { useFetchedResource } from "./useFetchedResource";

/** The signed-in user's MFA status. `refetch` keeps the last data on screen while it reloads. */
export const useMfaStatus = () => {
  const { token, userId } = useGetToken();
  const signOutOnUnauthorized = useSignOutOnUnauthorized();

  const fetchStatus = useCallback(
    () => signOutOnUnauthorized(getMfaStatus({ token, userId })),
    [token, userId, signOutOnUnauthorized]
  );

  return useFetchedResource(fetchStatus);
};
