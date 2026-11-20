import { MOCK_LOGIN_CHALLENGE } from "api/mocked/config";
import { SCENARIO_STATUS, ScenarioStatusInfo } from "api/mocked/scenarioStatus";
import { ObjectValues } from "utils/types";

/** What the mocked `POST /auth/v2/tokens` answers to a correct password. Picked in the dev panel. */
export const SIGN_IN_SCENARIO = Object.freeze({
  TOKEN_ISSUED: "token_issued",
  REAL_SIGN_IN: "real_sign_in",
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

/**
 * The dev panel's wording for each scenario: a short line under the picker, and the details — in the terms of the
 * MFA TDR's sign-in workflow — in its tooltip.
 */
export const SIGN_IN_SCENARIO_INFO: Record<SignInScenario, { label: string; description: string; details: string }> = {
  [SIGN_IN_SCENARIO.TOKEN_ISSUED]: {
    label: "MFA not enabled — token issued",
    description: "No MFA: straight into the app.",
    details:
      "201 Token. The user has no confirmed MFA method and no organization enforces MFA, so the token is issued exactly as today."
  },
  [SIGN_IN_SCENARIO.REAL_SIGN_IN]: {
    label: "Real sign-in — auth service",
    description: "Real credentials, real auth service — nothing mocked.",
    details:
      "Every MFA route — tokens, challenges, methods, policies — goes to the auth service behind VITE_PROXY; only login_options stays mocked. To see mocked MFA on signed-in pages, store a real session below and pick a mocked scenario instead."
  },
  [SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT]: {
    label: "Default method: authenticator app",
    description: "Asks for the authenticator app's code.",
    details:
      "202 LoginChallenge, state mfa_required. The authenticator app (TOTP) is the default and preselected; nothing is sent. E-mail is offered under “Use a different method”."
  },
  [SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT]: {
    label: "Default method: e-mail code (code sent)",
    description: "Asks for the e-mailed code, already sent.",
    details:
      "202 LoginChallenge, state mfa_required, code_sent: true — the code went out with the 202, so Resend waits a minute. The authenticator app is offered under “Use a different method”."
  },
  [SIGN_IN_SCENARIO.MFA_NO_DEFAULT]: {
    label: "No default method — user picks one",
    description: "Opens the method picker first.",
    details: "202 LoginChallenge, state mfa_required, default_method_id: null. Nothing is preselected."
  },
  [SIGN_IN_SCENARIO.MFA_NO_CONFIRMED_METHODS]: {
    label: "No confirmed method (contract edge case)",
    description: "No usable method: leads back to sign-in.",
    details:
      "202 LoginChallenge whose only method is still pending. The TDR never sends this; it checks that the UI offers no unusable method."
  },
  [SIGN_IN_SCENARIO.MFA_LAST_ATTEMPT]: {
    label: "One attempt left — wrong code locks it",
    description: "One wrong code ends the sign-in.",
    details: "202 LoginChallenge, attempts_left: 1. A wrong code answers 403 too many attempts and consumes the challenge."
  },
  [SIGN_IN_SCENARIO.MFA_EXPIRING]: {
    label: `Challenge expires in ${MOCK_LOGIN_CHALLENGE.SHORT_TTL_SECONDS} seconds`,
    description: `The code screen runs out after ${MOCK_LOGIN_CHALLENGE.SHORT_TTL_SECONDS} seconds.`,
    details: `202 LoginChallenge expiring ${MOCK_LOGIN_CHALLENGE.SHORT_TTL_SECONDS} seconds after sign-in instead of 5 minutes; afterwards the API answers 404 challenge gone.`
  },
  [SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED]: {
    label: "MFA enforced by organization, not set up",
    description: "Must add a method before getting in.",
    details:
      "202 LoginChallenge, state enrollment_required, methods empty. /mfa-enrollment adds one under the challenge; confirming it issues the token. A code sent to /tokens answers 403 OA0078. Once one tab enrolls, another tab's challenge answers 403 OA0089; 10 wrong codes in 15 minutes, across sign-ins, answer 403 OA0090."
  },
  [SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED]: {
    label: "E-mail not verified",
    description: "Sends the user to e-mail verification.",
    details:
      "403 OA0073 to the password. A code sign-in (recovery, verification) verifies the address, so it gets a token. Existing behaviour, outside the MFA TDR."
  },
  [SIGN_IN_SCENARIO.INTERNAL_ERROR]: {
    label: "Server error",
    description: "Sign-in fails with a generic error.",
    details: "500 OA0061 — any unexpected failure of the auth service."
  }
};

/** How far the UI behind each scenario is built. Keep in step with the user stories as screens land. */
export const SIGN_IN_SCENARIO_STATUS: Record<SignInScenario, ScenarioStatusInfo> = {
  [SIGN_IN_SCENARIO.TOKEN_ISSUED]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.REAL_SIGN_IN]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.MFA_NO_DEFAULT]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.MFA_NO_CONFIRMED_METHODS]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.MFA_LAST_ATTEMPT]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.MFA_EXPIRING]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED]: { status: SCENARIO_STATUS.READY },
  [SIGN_IN_SCENARIO.INTERNAL_ERROR]: { status: SCENARIO_STATUS.READY }
};

/** The picker's groups: what `POST /auth/v2/tokens` answers to a correct password. */
export const SIGN_IN_SCENARIO_GROUPS: { label: string; scenarios: SignInScenario[] }[] = [
  { label: "201 — Token", scenarios: [SIGN_IN_SCENARIO.TOKEN_ISSUED, SIGN_IN_SCENARIO.REAL_SIGN_IN] },
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
