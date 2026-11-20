import { useCallback } from "react";
import { getMfaStatus } from "@theme/api/auth/mfaMethods";
import { useGetToken } from "hooks/useGetToken";
import { useFetchedResource } from "./useFetchedResource";

/** The signed-in user's MFA status. `refetch` keeps the last data on screen while it reloads. */
export const useMfaStatus = () => {
  const { token, userId } = useGetToken();

  const fetchStatus = useCallback(() => getMfaStatus({ token, userId }), [token, userId]);

  return useFetchedResource(fetchStatus);
};
