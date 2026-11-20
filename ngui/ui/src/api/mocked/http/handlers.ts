import { AUTH_POLICIES_ROUTES } from "api/mocked/auth/authPolicies/routes";
import { MFA_METHODS_ROUTES } from "api/mocked/auth/mfaMethods/routes";
import { SESSION_ROUTES } from "api/mocked/auth/session/routes";
import { SIGN_IN_ROUTES } from "api/mocked/auth/signIn/routes";
import { SIGN_IN_SCENARIO } from "api/mocked/auth/signIn/scenarios";
import { USERS_ROUTES } from "api/mocked/auth/users/routes";
import { MOCK_LATENCY_MS } from "api/mocked/config";
import { delay } from "api/mocked/mockDelay";
import { matchRoute, MockedRequest, MockedResponse, MockedRoute, toErrorResponse } from "./router";
import { readSecurityScenarioCookie, readSignInScenarioCookie } from "./scenarioCookies";

export type { MockedRequest };

const MOCKED_ROUTES: MockedRoute[] = [
  ...SESSION_ROUTES,
  ...SIGN_IN_ROUTES,
  ...USERS_ROUTES,
  ...MFA_METHODS_ROUTES,
  ...AUTH_POLICIES_ROUTES
];

/**
 * The handler the dev-server plugin answers a request with, or `undefined` to let it through to the real backend
 * — no mocked route, or the real sign-in scenario, decided from the cookie before the body is read. Every answer
 * waits `MOCK_LATENCY_MS`, so the pending states show; errors a mock throws come back as the service's envelope.
 */
export const findMockedHandler = ({ method, path, cookie }: { method: string; path: string; cookie: string }) => {
  const match = matchRoute(MOCKED_ROUTES, { method, path });

  if (!match) {
    return undefined;
  }

  const { route, params } = match;
  const scenarios = { signIn: readSignInScenarioCookie(cookie), security: readSecurityScenarioCookie(cookie) };

  if (scenarios.signIn === SIGN_IN_SCENARIO.REAL_SIGN_IN && !route.answersRealSignIn) {
    return undefined;
  }

  return async (request: MockedRequest): Promise<MockedResponse> => {
    if (!route.skipsLatency) {
      await delay(MOCK_LATENCY_MS);
    }

    try {
      return await route.handle({ ...request, params, scenarios });
    } catch (error) {
      return toErrorResponse(error);
    }
  };
};
