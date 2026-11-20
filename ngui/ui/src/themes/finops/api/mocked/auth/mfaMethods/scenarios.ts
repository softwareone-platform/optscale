import { SCENARIO_STATUS, ScenarioStatusInfo } from "@theme/api/mocked/scenarioStatus";
import { ObjectValues } from "utils/types";

/** Where the signed-in user's MFA starts from on the mocked methods endpoints. Picked in the dev panel. */
export const SECURITY_SCENARIO = Object.freeze({
  NO_METHODS: "no_methods",
  TOTP_ONLY: "totp_only",
  TOTP_AND_EMAIL: "totp_and_email",
  ENFORCED_NO_METHODS: "enforced_no_methods",
  ENFORCED_WITH_METHODS: "enforced_with_methods",
  INTERNAL_ERROR: "internal_error",
  EMAIL_SERVICE_DOWN: "email_service_down"
} as const);

export type SecurityScenario = ObjectValues<typeof SECURITY_SCENARIO>;

export const DEFAULT_SECURITY_SCENARIO: SecurityScenario = SECURITY_SCENARIO.NO_METHODS;

/** The dev panel's wording for each scenario: a short line, and the TDR's `MfaStatus` terms in its tooltip. */
export const SECURITY_SCENARIO_INFO: Record<SecurityScenario, { label: string; description: string; details: string }> = {
  [SECURITY_SCENARIO.NO_METHODS]: {
    label: "No MFA method",
    description: "Nothing set up yet.",
    details: "status not_configured. No method and no organization enforcing MFA — the empty Security page."
  },
  [SECURITY_SCENARIO.TOTP_ONLY]: {
    label: "Authenticator app only",
    description: "One method, the default.",
    details: "status configured. One confirmed authenticator app (TOTP), which is the default."
  },
  [SECURITY_SCENARIO.TOTP_AND_EMAIL]: {
    label: "Authenticator app and e-mail",
    description: "Two methods; the app is the default.",
    details: "status configured. Two confirmed methods; the authenticator app is the default."
  },
  [SECURITY_SCENARIO.ENFORCED_NO_METHODS]: {
    label: "Enforced by organization, nothing set up",
    description: "The organization requires MFA; no method yet.",
    details: "status enforced, methods empty. The state the enforced setup at sign-in starts from."
  },
  [SECURITY_SCENARIO.ENFORCED_WITH_METHODS]: {
    label: "Enforced by organization, authenticator app set up",
    description: "The organization requires MFA; its only method can't be removed.",
    details: "status enforced. The TDR's “Get MFA status” example: enforced wins over configured."
  },
  [SECURITY_SCENARIO.INTERNAL_ERROR]: {
    label: "Server error",
    description: "The Security page can't load.",
    details: "500 OA0061 on GET mfa_methods."
  },
  [SECURITY_SCENARIO.EMAIL_SERVICE_DOWN]: {
    label: "E-mail service down",
    description: "An e-mail method can't be added.",
    details: "status not_configured. Starting an e-mail enrollment answers 503 U0503, as when the service cannot send mail."
  }
};

// One page serves every scenario, so they share a status.
const SECURITY_PAGE_STATUS: ScenarioStatusInfo = { status: SCENARIO_STATUS.READY };

/** How far the UI behind each scenario is built. Keep in step with the user stories as screens land. */
export const SECURITY_SCENARIO_STATUS: Record<SecurityScenario, ScenarioStatusInfo> = {
  [SECURITY_SCENARIO.NO_METHODS]: SECURITY_PAGE_STATUS,
  [SECURITY_SCENARIO.TOTP_ONLY]: SECURITY_PAGE_STATUS,
  [SECURITY_SCENARIO.TOTP_AND_EMAIL]: SECURITY_PAGE_STATUS,
  [SECURITY_SCENARIO.ENFORCED_NO_METHODS]: SECURITY_PAGE_STATUS,
  [SECURITY_SCENARIO.ENFORCED_WITH_METHODS]: SECURITY_PAGE_STATUS,
  [SECURITY_SCENARIO.INTERNAL_ERROR]: SECURITY_PAGE_STATUS,
  [SECURITY_SCENARIO.EMAIL_SERVICE_DOWN]: SECURITY_PAGE_STATUS
};

export const isSecurityScenario = (value: unknown): value is SecurityScenario =>
  Object.values<unknown>(SECURITY_SCENARIO).includes(value);
