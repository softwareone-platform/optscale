import { v4 as uuidv4 } from "uuid";
import { AUTH_POLICY_PURPOSE, AUTH_POLICY_SCOPE_TYPE } from "api/auth/authPolicies/constants";
import { AuthPolicy } from "api/auth/authPolicies/types";
import { MfaEnrollment } from "api/auth/mfaMethods/types";
import { AuthToken, LoginChallenge } from "api/auth/signIn/types";
import { CREATED_POLICY_BODY } from "api/mocked/auth/authPolicies/fixtures";
import { SecurityScenario } from "api/mocked/auth/mfaMethods/scenarios";
import { MOCK_AUTH_POLICY, MOCK_SIGN_IN_CREDENTIALS } from "api/mocked/config";

type StoredChallenge = Pick<LoginChallenge, "user_id" | "state" | "expires_at" | "attempts_left" | "user_email"> & {
  codeSentAt: number | null;
  // Set once another of the user's challenges enrolls a method.
  isEnrollmentClosed: boolean;
};

export type UserMfa = {
  scenario: SecurityScenario;
  // Pending and confirmed alike; a TOTP enrollment keeps its secret, the responses strip it.
  methods: MfaEnrollment[];
  mfaEnforced: boolean;
  enforcingOrganizations: string[];
  emailCodeSentAt: number | null;
};

/** A session the real auth service issued, captured in the dev panel and handed out by the mocked sign-in. */
export type RealSession = Pick<AuthToken, "token" | "user_id" | "user_email">;

type MockState = {
  challenges: Map<string, StoredChallenge>;
  failedAttemptTimesByUser: Map<string, number[]>;
  usersMfa: Map<string, UserMfa>;
  /** The password the mocked sign-in accepts; a mocked recovery replaces it. */
  password: string;
  policies: AuthPolicy[];
  realSession: (RealSession & { captured_at: number }) | null;
};

const createInitialState = (): MockState => ({
  challenges: new Map(),
  failedAttemptTimesByUser: new Map(),
  usersMfa: new Map(),
  password: MOCK_SIGN_IN_CREDENTIALS.password,
  policies: [
    {
      ...CREATED_POLICY_BODY,
      id: uuidv4(),
      scope_type: AUTH_POLICY_SCOPE_TYPE.ORGANIZATION,
      scope_id: MOCK_AUTH_POLICY.NOT_MANAGED_ORGANIZATION_ID,
      purpose: AUTH_POLICY_PURPOSE.MFA
    }
  ],
  realSession: null
});

/**
 * Everything the mocks remember. Lives as long as the dev server's module instance, like the service's tables, so
 * restarting the server starts over. Read and written only through the files beside this one.
 */
export const mockState = createInitialState();

/** Back to a freshly started dev server; specs call it so none depends on what another left behind. */
export const resetMockState = () => {
  Object.assign(mockState, createInitialState());
};
