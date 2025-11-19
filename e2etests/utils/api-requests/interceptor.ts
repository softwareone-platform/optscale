import { expect, Page, Route } from '@playwright/test';
import { debugLog } from '../debug-logging';
import { InterceptionEntry } from '../../types/interceptor.types';

const HTTP_STATUS_OK = 200;
const CONTENT_TYPE_JSON = 'application/json';

/**
 * Responds to a route with mock JSON data
 */
export const respondWithMockData = async <T>(route: Route, mock: T): Promise<void> => {
  await route.fulfill({
    status: HTTP_STATUS_OK,
    contentType: CONTENT_TYPE_JSON,
    body: JSON.stringify(mock),
  });
};

export const createInterceptorId = (gql?: string, url?: string): string => (gql ? `GraphQL:${gql}` : `REST:${url}`);

/**
 * Intercepts REST API requests matching the provided pattern
 */
export async function interceptRESTRequest<T>(page: Page, pattern: RegExp, mock: T, onIntercepted: () => void): Promise<void> {
  await page.route(pattern, async route => {
    onIntercepted();

    return await respondWithMockData(route, mock);
  });
}

/**
 * Intercepts GraphQL requests matching the provided operation name
 */
async function interceptGraphQLRequest(
  page: Page,
  urlPattern: RegExp,
  operationName: string,
  mock: any,
  onIntercepted: () => void,
  variableMatch?: Record<string, any>
) {
  await page.route(urlPattern, async route => {
    const postData = route.request().postData();
    if (!postData) return route.fallback();

    const body = JSON.parse(postData);

    // Add logging to see all requests
    debugLog(`\n=== GraphQL Request Interceptor ===`);
    debugLog(`Expected operation: ${operationName}`);
    debugLog(`Actual operation: ${body.operationName}`);
    debugLog(`Expected variableMatch: ${variableMatch}`);
    debugLog(`Actual variables: ${JSON.stringify(body.variables, null, 2)}`);

    // Only proceed if operation name matches
    if (body.operationName !== operationName) {
      //debugLog(`❌ Operation name mismatch - continuing to next interceptor`);
      return route.fallback();
    }

    debugLog(`✅ Operation name matches`);

    // If variableMatch is provided, check if all specified variables match
    if (variableMatch) {
      const allVariablesMatch = Object.entries(variableMatch).every(([keyPath, expectedValue]) => {
        const actualValue = getNestedValue(body.variables, keyPath);
        debugLog(`Checking ${keyPath}: expected=${expectedValue}, actual=${actualValue}`);
        return actualValue === expectedValue;
      });

      if (!allVariablesMatch) {
        debugLog(`❌ Variable match failed - continuing to next interceptor`);
        return route.fallback();
      }
      debugLog(`✅ Variable match succeeded`);
    } else {
      debugLog(`ℹ️ No variable matching required`);
    }

    debugLog(`🎯 INTERCEPTING with mock data`);
    onIntercepted();
    return await respondWithMockData(route, mock);
  });
}

// Helper function to get nested object values using dot notation
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Sets up API interceptors for Playwright tests and returns a function to verify if all interceptions occurred.
 *
 * @param page - The Playwright `Page` object where the interceptors will be applied
 * @param config - Array of interception configurations
 * @param failOnInterceptionMissing - Whether the test should fail if interceptions are not triggered
 * @returns A verification function to check if all interceptions were triggered
 */
export async function apiInterceptors(page: Page, config: InterceptionEntry[], failOnInterceptionMissing = false): Promise<() => void> {
  const interceptorHits = new Map<string, boolean>();

  const registerHit = (id: string): (() => void) => {
    debugLog(`(HIT) Request intercepted&mocked ${id}`);
    return () => interceptorHits.set(id, true);
  };

  const interceptPromises = config.map(({ url, mock, gql, variableMatch }, index) => {
    const urlRegExp = new RegExp(url || '/api$');
    const interceptorId = createInterceptorId(gql, url);

    debugLog(`\n=== Registering Interceptor ${index + 1} ===`);
    debugLog(`ID: ${interceptorId}`);
    debugLog(`GraphQL Operation: ${gql || 'N/A'}`);
    debugLog(`Variable Match: ${variableMatch || 'None'}`);
    debugLog(`URL Pattern: ${urlRegExp}`);

    interceptorHits.set(interceptorId, false);

    return gql
      ? interceptGraphQLRequest(page, urlRegExp, gql, mock, registerHit(interceptorId), variableMatch)
      : interceptRESTRequest(page, urlRegExp, mock, registerHit(interceptorId));
  });

  await Promise.all(interceptPromises);

  return () => {
    const missingInterceptions = Array.from(interceptorHits.entries())
      .filter(([_, wasHit]) => !wasHit)
      .map(([id]) => id);

    if (missingInterceptions.length > 0) {
      const message =
        `${missingInterceptions.length} API interception(s) never occurred:\n` + missingInterceptions.map(x => `- ${x}`).join('\n');

      debugLog(message);

      if (failOnInterceptionMissing) {
        expect(missingInterceptions.length, message).toBe(0);
      }
    }
  };
}
