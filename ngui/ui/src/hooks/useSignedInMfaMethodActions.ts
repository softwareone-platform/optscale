import { useMemo } from "react";
import { deleteMfaMethod, updateMfaMethod } from "api/auth/mfaMethods";
import { useGetToken } from "hooks/useGetToken";

/** Changes to the signed-in user's own MFA methods, from the Security page's `…` menu. Only a TOTP method has a name to change. */
export const useSignedInMfaMethodActions = () => {
  const { token, userId } = useGetToken();

  return useMemo(
    () => ({
      setDefault: (methodId: string) => updateMfaMethod({ token, userId, methodId, is_default: true }),
      rename: (methodId: string, label: string) => updateMfaMethod({ token, userId, methodId, label }),
      remove: (methodId: string) => deleteMfaMethod({ token, userId, methodId })
    }),
    [token, userId]
  );
};
