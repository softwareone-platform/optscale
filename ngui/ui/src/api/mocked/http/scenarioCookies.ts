import { DEFAULT_SECURITY_SCENARIO, isSecurityScenario, SecurityScenario } from "api/mocked/auth/mfaMethods/scenarios";
import { DEFAULT_SIGN_IN_SCENARIO, isSignInScenario, SignInScenario } from "api/mocked/auth/signIn/scenarios";
import { SECURITY_SCENARIO_COOKIE, SIGN_IN_SCENARIO_COOKIE } from "api/mocked/config";

// A cookie rides along with the app's own `fetch`, so the real transport never has to know a mock exists.

const readCookie = (cookieHeader: string, name: string) =>
  cookieHeader
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .find(([cookieName]) => cookieName === name)?.[1];

const writeCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/; SameSite=Strict`;
};

export const readSignInScenarioCookie = (cookieHeader: string): SignInScenario => {
  const value = readCookie(cookieHeader, SIGN_IN_SCENARIO_COOKIE);

  return isSignInScenario(value) ? value : DEFAULT_SIGN_IN_SCENARIO;
};

export const writeSignInScenarioCookie = (scenario: SignInScenario) => writeCookie(SIGN_IN_SCENARIO_COOKIE, scenario);

export const readSecurityScenarioCookie = (cookieHeader: string): SecurityScenario => {
  const value = readCookie(cookieHeader, SECURITY_SCENARIO_COOKIE);

  return isSecurityScenario(value) ? value : DEFAULT_SECURITY_SCENARIO;
};

export const writeSecurityScenarioCookie = (scenario: SecurityScenario) => writeCookie(SECURITY_SCENARIO_COOKIE, scenario);
