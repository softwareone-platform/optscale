import { describe, expect, it } from "vitest";
import { AUTH_POLICY_PURPOSE, AUTH_POLICY_SCOPE_TYPE } from "@theme/api/auth/authPolicies/constants";
import { STATUS_BODY } from "@theme/api/mocked/auth/mfaMethods/fixtures";
import { SECURITY_SCENARIO } from "@theme/api/mocked/auth/mfaMethods/scenarios";
import { CHALLENGE_BODY, issueChallenge } from "@theme/api/mocked/auth/signIn/fixtures";
import { MOCK_AUTH_POLICY, MOCK_SIGN_IN_CREDENTIALS } from "@theme/api/mocked/config";
import { addPolicy, findPolicies } from "./authPolicies";
import { findLiveChallenge, storeChallenge } from "./challenges";
import { resetMockState } from "./mockState";
import { getMockPassword, setMockPassword } from "./password";
import { findRealSession, storeRealSession } from "./realSession";
import { loadUserMfa, setUserMethods } from "./userMfa";

const ORGANIZATION = { scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION, scope_id: "org-1" };

const USER = { userId: "user-1", scenario: SECURITY_SCENARIO.TOTP_ONLY, seed: STATUS_BODY.TOTP_ONLY };

describe("resetMockState", () => {
  it("forgets everything the mocks were told, as a restarted dev server does", () => {
    const challenge = issueChallenge(CHALLENGE_BODY.MFA_TOTP_DEFAULT, MOCK_SIGN_IN_CREDENTIALS.email);
    storeChallenge(challenge);
    loadUserMfa(USER);
    setUserMethods(USER.userId, []);
    setMockPassword("n3w-Passw0rd");
    addPolicy({ id: "policy-1", created_at: 0, deleted_at: 0, ...ORGANIZATION, purpose: AUTH_POLICY_PURPOSE.MFA });
    storeRealSession({ token: "MDAxY-real", user_id: "9c2a", user_email: "reto.mayer@example.com" });

    resetMockState();

    expect(findLiveChallenge(challenge.challenge_id)).toBeUndefined();
    expect(loadUserMfa(USER).methods).toHaveLength(1);
    expect(getMockPassword()).toBe(MOCK_SIGN_IN_CREDENTIALS.password);
    expect(findPolicies(ORGANIZATION)).toEqual([]);
    expect(findRealSession()).toBeNull();
  });

  it("starts with the policy of the organization the user does not manage", () => {
    resetMockState();

    expect(findPolicies({ ...ORGANIZATION, scope_id: MOCK_AUTH_POLICY.NOT_MANAGED_ORGANIZATION_ID })).toHaveLength(1);
  });
});
