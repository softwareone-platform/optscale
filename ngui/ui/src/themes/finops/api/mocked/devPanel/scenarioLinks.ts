import { SECURITY_SCENARIO, SecurityScenario } from "@theme/api/mocked/auth/mfaMethods/scenarios";
import { SIGN_IN_SCENARIO, SignInScenario } from "@theme/api/mocked/auth/signIn/scenarios";

/** Which Security page scenarios fit a sign-in scenario's user — or why the picker has nothing to offer. */
type SecurityScenarioChoice = { scenarios: SecurityScenario[] } | { hiddenBecause: string };

const WITHOUT_METHODS: SecurityScenarioChoice = {
  scenarios: [SECURITY_SCENARIO.NO_METHODS, SECURITY_SCENARIO.EMAIL_SERVICE_DOWN, SECURITY_SCENARIO.INTERNAL_ERROR]
};

// Every challenge scenario's user already has methods.
const WITH_METHODS: SecurityScenarioChoice = {
  scenarios: [
    SECURITY_SCENARIO.TOTP_AND_EMAIL,
    SECURITY_SCENARIO.TOTP_ONLY,
    SECURITY_SCENARIO.ENFORCED_WITH_METHODS,
    SECURITY_SCENARIO.INTERNAL_ERROR
  ]
};

const NEVER_SIGNED_IN: SecurityScenarioChoice = { hiddenBecause: "This sign-in never reaches the app." };

// Keyed by every sign-in scenario, so a new one fails to compile until it says which users it signs in.
export const SECURITY_SCENARIO_CHOICE: Record<SignInScenario, SecurityScenarioChoice> = {
  [SIGN_IN_SCENARIO.TOKEN_ISSUED]: WITHOUT_METHODS,
  [SIGN_IN_SCENARIO.REAL_SIGN_IN]: { hiddenBecause: "Real sign-in: the Security page asks the real auth service." },
  [SIGN_IN_SCENARIO.MFA_TOTP_DEFAULT]: WITH_METHODS,
  [SIGN_IN_SCENARIO.MFA_EMAIL_DEFAULT]: WITH_METHODS,
  [SIGN_IN_SCENARIO.MFA_NO_DEFAULT]: WITH_METHODS,
  [SIGN_IN_SCENARIO.MFA_NO_CONFIRMED_METHODS]: NEVER_SIGNED_IN,
  [SIGN_IN_SCENARIO.MFA_LAST_ATTEMPT]: WITH_METHODS,
  [SIGN_IN_SCENARIO.MFA_EXPIRING]: WITH_METHODS,
  // The enforced setup adds its method to this state, so the Security page shows it afterwards.
  [SIGN_IN_SCENARIO.ENROLLMENT_REQUIRED]: { scenarios: [SECURITY_SCENARIO.ENFORCED_NO_METHODS] },
  [SIGN_IN_SCENARIO.EMAIL_NOT_VERIFIED]: WITHOUT_METHODS,
  [SIGN_IN_SCENARIO.INTERNAL_ERROR]: NEVER_SIGNED_IN
};

/** The Security page scenario to keep once `signInScenario` is picked: the current one if it still fits, else the first that does. */
export const getFittingSecurityScenario = (signInScenario: SignInScenario, current: SecurityScenario) => {
  const choice = SECURITY_SCENARIO_CHOICE[signInScenario];

  if ("hiddenBecause" in choice || choice.scenarios.includes(current)) {
    return current;
  }

  return choice.scenarios[0];
};
