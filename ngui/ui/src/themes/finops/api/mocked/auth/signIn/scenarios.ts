import { ObjectValues } from "utils/types";

/** What the mocked `POST /auth/v2/tokens` answers to a correct password. Picked in the dev panel. */
export const SIGN_IN_SCENARIO = Object.freeze({
  TOKEN_ISSUED: "token_issued",
  MFA_TOTP_DEFAULT: "mfa_totp_default",
  MFA_EMAIL_DEFAULT: "mfa_email_default",
  MFA_NO_DEFAULT: "mfa_no_default",
  MFA_NO_CONFIRMED_METHODS: "mfa_no_confirmed_methods",
  MFA_LAST_ATTEMPT: "mfa_last_attempt",
  MFA_EXPIRING: "mfa_expiring",
  ENROLLMENT_REQUIRED: "enrollment_required",
  EMAIL_NOT_VERIFIED: "email_not_verified",
  INTERNAL_ERROR: "internal_error"
} as const);

export type SignInScenario = ObjectValues<typeof SIGN_IN_SCENARIO>;

export const DEFAULT_SIGN_IN_SCENARIO: SignInScenario = SIGN_IN_SCENARIO.TOKEN_ISSUED;

export const SIGN_IN_SCENARIO_DESCRIPTION: Record<SignInScenario, string> = {
  [SIGN_IN_SCENARIO.TOKEN_ISSUED]: "201 token — no MFA, straight into the app",
  [SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT]: "202 mfa_required — authenticator app is the default",
  [SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT]: "202 mfa_required — e-mail is the default, code already sent",
  [SIGN_IN_SCENARIO.MFA_NO_DEFAULT]: "202 mfa_required — no default method, opens the method picker",
  [SIGN_IN_SCENARIO.MFA_NO_CONFIRMED_METHODS]: "202 mfa_required — no confirmed method (contract edge case)",
  [SIGN_IN_SCENARIO.MFA_LAST_ATTEMPT]: "202 mfa_required — one attempt left, a wrong code locks the challenge",
  [SIGN_IN_SCENARIO.MFA_EXPIRING]: "202 mfa_required — expires 30 seconds after sign-in",
  [SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED]: "202 enrollment_required — MFA enforced, nothing configured",
  [SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED]: "403 OA0073 — email not verified",
  [SIGN_IN_SCENARIO.INTERNAL_ERROR]: "500 OA0061 — generic error"
};

export const isSignInScenario = (value: unknown): value is SignInScenario =>
  Object.values<unknown>(SIGN_IN_SCENARIO).includes(value);
