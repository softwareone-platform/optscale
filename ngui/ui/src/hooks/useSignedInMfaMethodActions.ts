import { useMemo } from "react";
import { deleteMfaMethod, updateMfaMethod } from "api/auth/mfaMethods";
import { useGetToken } from "hooks/useGetToken";
import { useSignOutOnUnauthorized } from "hooks/useSignOutOnUnauthorized";

/** Changes to the signed-in user's own MFA methods, from the Security page's `…` menu. Only a TOTP method has a name to change. */
export const useSignedInMfaMethodActions = () => {
  const { token, userId } = useGetToken();
  const signOutOnUnauthorized = useSignOutOnUnauthorized();

  return useMemo(
    () => ({
      setDefault: (methodId: string) => signOutOnUnauthorized(updateMfaMethod({ token, userId, methodId, is_default: true })),
      rename: (methodId: string, label: string) => signOutOnUnauthorized(updateMfaMethod({ token, userId, methodId, label })),
      remove: (methodId: string) => signOutOnUnauthorized(deleteMfaMethod({ token, userId, methodId })),
    }),
    [token, userId, signOutOnUnauthorized]
  );
};
