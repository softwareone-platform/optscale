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
export async function interceptGraphQLRequest<T>(
  page: Page,
  pattern: RegExp,
  operationName: string,
  mock: T,
  onIntercepted: () => void
): Promise<void> {
  await page.route(pattern, async (route, request) => {
    if (request.method() !== 'POST') {
      return route.fallback();
    }
    try {
      const body = JSON.parse(request.postData() || '{}');
      if (body.operationName === operationName) {
        onIntercepted();
        await respondWithMockData(route, mock);
        return;
      }
    } catch (error) {
      console.warn(`Failed to parse GraphQL POST data for operation ${operationName}:`, error);
    }
    return route.fallback();
  });
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

  const interceptPromises = config.map(({ url, mock, gql }) => {
    const urlRegExp = new RegExp(url || '/api$');
    const interceptorId = createInterceptorId(gql, url);

    interceptorHits.set(interceptorId, false);

    return gql
      ? interceptGraphQLRequest(page, urlRegExp, gql, mock, registerHit(interceptorId))
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
