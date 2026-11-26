import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AuthApiError } from "api/auth/errors";
import { useGetToken } from "hooks/useGetToken";
import { signOut } from "utils/api";

/**
 * Wraps a call made with the session's token: a `401` means the session ended, so it signs out, as upstream's REST
 * and GraphQL layers do. The rejection still reaches the caller.
 */
export const useSignOutOnUnauthorized = () => {
  const dispatch = useDispatch();
  const { userEmail } = useGetToken();

  return useCallback(
    <TResult>(call: Promise<TResult>): Promise<TResult> =>
      call.catch((error: unknown) => {
        if (error instanceof AuthApiError && error.status === 401) {
          signOut(dispatch, { userEmail });
        }

        throw error;
      }),
    [dispatch, userEmail]
  );
};
