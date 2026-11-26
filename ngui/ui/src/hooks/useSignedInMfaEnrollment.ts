import { useMemo } from "react";
import { confirmMfaEnrollment, startMfaEnrollment } from "api/auth/mfaMethods";
import type { MfaEnrollmentCalls } from "components/AddMfaMethod";
import { useGetToken } from "hooks/useGetToken";
import { useSignOutOnUnauthorized } from "hooks/useSignOutOnUnauthorized";

/** The add-method dialog's calls, made as the signed-in user. */
export const useSignedInMfaEnrollment = (): MfaEnrollmentCalls => {
  const { token, userId } = useGetToken();
  const signOutOnUnauthorized = useSignOutOnUnauthorized();

  return useMemo(
    () => ({
      start: ({ type, label }) => signOutOnUnauthorized(startMfaEnrollment({ token, userId, type, label })),
      confirm: ({ methodId, code }) => signOutOnUnauthorized(confirmMfaEnrollment({ token, userId, methodId, code })),
    }),
    [token, userId, signOutOnUnauthorized]
  );
};
