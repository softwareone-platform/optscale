import { MOCK_LOGIN_CHALLENGE } from "@theme/api/mocked/config";
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

/** The dev panel's wording for each scenario, in the terms of the MFA TDR's sign-in workflow. */
export const SIGN_IN_SCENARIO_INFO: Record<SignInScenario, { label: string; description: string }> = {
  [SIGN_IN_SCENARIO.TOKEN_ISSUED]: {
    label: "MFA not enabled — token issued",
    description:
      "201 Token. The user has no confirmed MFA method and no organization enforces MFA, so the token is issued exactly as today and the user goes straight into the app."
  },
  [SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT]: {
    label: "Default method: authenticator app",
    description:
      "202 LoginChallenge, state mfa_required. The authenticator app (TOTP) is the default method and is preselected; nothing is sent, the app generates the code. E-mail is offered under “Use a different method”."
  },
  [SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT]: {
    label: "Default method: e-mail code (code sent)",
    description:
      "202 LoginChallenge, state mfa_required. E-mail is the default method, so the code was sent together with the 202 (code_sent: true). The authenticator app is offered under “Use a different method”."
  },
  [SIGN_IN_SCENARIO.MFA_NO_DEFAULT]: {
    label: "No default method — user picks one",
    description:
      "202 LoginChallenge, state mfa_required, default_method_id: null. Nothing is preselected, so sign-in opens “Verify your identity” to pick between the confirmed methods."
  },
  [SIGN_IN_SCENARIO.MFA_NO_CONFIRMED_METHODS]: {
    label: "No confirmed method (contract edge case)",
    description:
      "202 LoginChallenge, state mfa_required, but its only method is still pending. The TDR never sends this; it checks that the UI offers no unusable method and leads back to sign-in."
  },
  [SIGN_IN_SCENARIO.MFA_LAST_ATTEMPT]: {
    label: "One attempt left — wrong code locks it",
    description:
      "202 LoginChallenge, state mfa_required, attempts_left: 1. A wrong code is the 5th failed attempt: 403 too many attempts, the challenge is consumed and sign-in starts over."
  },
  [SIGN_IN_SCENARIO.MFA_EXPIRING]: {
    label: `Challenge expires in ${MOCK_LOGIN_CHALLENGE.SHORT_TTL_SECONDS} seconds`,
    description: `202 LoginChallenge, state mfa_required, expiring ${MOCK_LOGIN_CHALLENGE.SHORT_TTL_SECONDS} seconds after sign-in instead of 5 minutes. Once the countdown ends the challenge is gone — the API would answer 404 challenge missing / expired.`
  },
  [SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED]: {
    label: "MFA enforced by organization, not set up",
    description:
      "202 LoginChallenge, state enrollment_required. An organization enforces MFA but the user has no method yet, so methods is empty and the user must add one before any token is issued (/mfa-enrollment)."
  },
  [SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED]: {
    label: "E-mail not verified",
    description:
      "403 OA0073. The password is right but the e-mail address is not verified, so sign-in moves to e-mail verification. Existing behaviour, outside the MFA TDR."
  },
  [SIGN_IN_SCENARIO.INTERNAL_ERROR]: {
    label: "Server error",
    description: "500 OA0061. Any unexpected failure of the auth service; the password step shows a generic error."
  }
};

/** The picker's groups: what `POST /auth/v2/tokens` answers to a correct password. */
export const SIGN_IN_SCENARIO_GROUPS: { label: string; scenarios: SignInScenario[] }[] = [
  { label: "201 — Token", scenarios: [SIGN_IN_SCENARIO.TOKEN_ISSUED] },
  {
    label: "202 — MFA challenge (mfa_required)",
    scenarios: [
      SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT,
      SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT,
      SIGN_IN_SCENARIO.MFA_NO_DEFAULT,
      SIGN_IN_SCENARIO.MFA_LAST_ATTEMPT,
      SIGN_IN_SCENARIO.MFA_EXPIRING,
      SIGN_IN_SCENARIO.MFA_NO_CONFIRMED_METHODS
    ]
  },
  { label: "202 — Enrollment (enrollment_required)", scenarios: [SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED] },
  { label: "Errors", scenarios: [SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED, SIGN_IN_SCENARIO.INTERNAL_ERROR] }
];

export const isSignInScenario = (value: unknown): value is SignInScenario =>
  Object.values<unknown>(SIGN_IN_SCENARIO).includes(value);
