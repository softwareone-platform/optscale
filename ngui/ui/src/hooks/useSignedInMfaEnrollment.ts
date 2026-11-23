import { useMemo } from "react";
import { confirmMfaEnrollment, startMfaEnrollment } from "api/auth/mfaMethods";
import type { MfaEnrollmentCalls } from "components/AddMfaMethod";
import { useGetToken } from "hooks/useGetToken";

/** The add-method dialog's calls, made as the signed-in user. */
export const useSignedInMfaEnrollment = (): MfaEnrollmentCalls => {
  const { token, userId } = useGetToken();

  return useMemo(
    () => ({
      start: ({ type, label }) => startMfaEnrollment({ token, userId, type, label }),
      confirm: ({ methodId, code }) => confirmMfaEnrollment({ token, userId, methodId, code })
    }),
    [token, userId]
  );
};
