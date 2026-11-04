import { DEFAULT_SIGN_IN_SCENARIO, isSignInScenario, SignInScenario } from "@theme/api/mocked/auth/signIn/scenarios";
import { SIGN_IN_SCENARIO_COOKIE } from "@theme/api/mocked/config";

// A cookie rides along with the app's own `fetch`, so the real transport never has to know a mock exists.

export const readSignInScenarioCookie = (cookieHeader: string): SignInScenario => {
  const value = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .find(([name]) => name === SIGN_IN_SCENARIO_COOKIE)?.[1];

  return isSignInScenario(value) ? value : DEFAULT_SIGN_IN_SCENARIO;
};

export const writeSignInScenarioCookie = (scenario: SignInScenario) => {
  document.cookie = `${SIGN_IN_SCENARIO_COOKIE}=${scenario}; path=/; SameSite=Strict`;
};
