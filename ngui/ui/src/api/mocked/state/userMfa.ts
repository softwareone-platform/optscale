import { MfaEnrollment, MfaStatus } from "api/auth/mfaMethods/types";
import { SecurityScenario } from "api/mocked/auth/mfaMethods/scenarios";
import { MOCK_MFA } from "api/mocked/config";
import { getCurrentUTCTimeInSec } from "utils/datetime";
import { mockState, UserMfa } from "./mockState";

const isExpiredPending = ({ confirmed, created_at }: MfaEnrollment, nowSeconds: number) =>
  !confirmed && nowSeconds - created_at >= MOCK_MFA.PENDING_ENROLLMENT_TTL_SECONDS;

/**
 * The user's MFA, seeded from the scenario's `GET` body. Picking another scenario in the dev panel starts the user
 * over from it; a pending enrollment older than 15 minutes is dropped, as the service discards it.
 */
export const loadUserMfa = (
  { userId, scenario, seed }: { userId: string; scenario: SecurityScenario; seed: MfaStatus },
  nowSeconds = getCurrentUTCTimeInSec()
): UserMfa => {
  const stored = mockState.usersMfa.get(userId);

  const user =
    stored?.scenario === scenario
      ? stored
      : {
          scenario,
          methods: seed.methods.map((method) => ({ ...method, user_id: userId })),
          mfaEnforced: seed.mfa_enforced,
          enforcingOrganizations: [...seed.enforcing_organizations],
          emailCodeSentAt: null
        };

  user.methods = user.methods.filter((method) => !isExpiredPending(method, nowSeconds));
  mockState.usersMfa.set(userId, user);

  return user;
};

/** Records a new e-mail code, or returns `false` while the last one is under a minute old. */
export const recordEmailCodeSent = (userId: string, nowSeconds = getCurrentUTCTimeInSec()) => {
  const user = mockState.usersMfa.get(userId);

  if (!user || (user.emailCodeSentAt !== null && nowSeconds - user.emailCodeSentAt < MOCK_MFA.CODE_THROTTLE_SECONDS)) {
    return false;
  }

  user.emailCodeSentAt = nowSeconds;

  return true;
};

/** Replaces a stored user's methods — for the enrollment both the signed-in and the sign-in challenge routes share. */
export const setUserMethods = (userId: string, methods: MfaEnrollment[]) => {
  const user = mockState.usersMfa.get(userId);

  if (user) {
    user.methods = methods;
  }
};
