import { useCallback, useEffect, useState } from "react";
import { getMfaStatus, MfaStatus } from "@theme/api/auth/mfaMethods";
import { useGetToken } from "hooks/useGetToken";

type MfaStatusState =
  | { status: "loading"; data: MfaStatus | null }
  | { status: "error"; data: MfaStatus | null }
  | { status: "loaded"; data: MfaStatus };

/** The signed-in user's MFA status. `refetch` keeps the last data on screen while it reloads. */
export const useMfaStatus = () => {
  const { token, userId } = useGetToken();

  const [state, setState] = useState<MfaStatusState>({ status: "loading", data: null });

  const refetch = useCallback(async () => {
    setState((previous) => ({ status: "loading", data: previous.data }));

    try {
      setState({ status: "loaded", data: await getMfaStatus({ token, userId }) });
    } catch {
      setState((previous) => ({ status: "error", data: previous.data }));
    }
  }, [token, userId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { ...state, refetch };
};
