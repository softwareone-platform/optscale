import { useCallback, useState } from "react";
import type { MfaMethodType } from "@theme/api/auth/mfaMethod";
import type { MfaEnrollment, MfaMethodDetails } from "@theme/api/auth/mfaMethods";
import { getAttemptsLeft } from "@theme/api/auth/signIn";
import { ENROLLMENT_FAILURE } from "./constants";
import { EnrollmentFailure, MfaEnrollmentCalls } from "./types";
import { getEnrollmentFailure } from "./utils";

type UseEnrollmentParams = {
  type: MfaMethodType;
  calls: MfaEnrollmentCalls;
  onConfirmed: (method: MfaMethodDetails) => void;
};

/** One enrollment of `type`: started on demand, confirmed with a code, started again once it expires. */
export const useEnrollment = ({ type, calls, onConfirmed }: UseEnrollmentParams) => {
  const [enrollment, setEnrollment] = useState<MfaEnrollment | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [failure, setFailure] = useState<EnrollmentFailure | null>(null);
  // Bumped on every rejected code, so the code entry can start over empty.
  const [rejectedCodeCount, setRejectedCodeCount] = useState(0);
  // Only a sign-in challenge counts attempts; the signed-in enrollment leaves this `null`.
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

  const start = useCallback(async () => {
    setFailure(null);
    setIsStarting(true);

    try {
      setEnrollment(await calls.start(type));
    } catch (error) {
      // A failed restart keeps the enrollment already shown — a resent e-mail code within the minute, say.
      setFailure(getEnrollmentFailure(error));
    } finally {
      setIsStarting(false);
    }
  }, [calls, type]);

  const confirm = async (code: string) => {
    if (!enrollment) {
      return;
    }

    setFailure(null);
    setIsConfirming(true);

    try {
      onConfirmed(await calls.confirm({ methodId: enrollment.id, code }));
    } catch (error) {
      const confirmFailure = getEnrollmentFailure(error);

      setFailure(confirmFailure);
      setAttemptsLeft(getAttemptsLeft(error));

      if (confirmFailure === ENROLLMENT_FAILURE.INVALID_CODE) {
        setRejectedCodeCount((count) => count + 1);
      }

      // The service has discarded it, so its secret or code is no use any more.
      if (confirmFailure === ENROLLMENT_FAILURE.EXPIRED) {
        setEnrollment(null);
      }
    } finally {
      setIsConfirming(false);
    }
  };

  return { enrollment, isStarting, isConfirming, failure, attemptsLeft, rejectedCodeCount, start, confirm };
};

export type EnrollmentState = ReturnType<typeof useEnrollment>;
