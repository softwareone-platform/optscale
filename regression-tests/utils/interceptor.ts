import { Page, Route } from '@playwright/test';
import { debugLog } from './debug-logging';

type XOR<T, U> = (T & { [K in Exclude<keyof U, keyof T>]?: never }) | (U & { [K in Exclude<keyof T, keyof U>]?: never });

type IGraphQLEntry = { gql: string; mock: any };
type IRESTEntry = { url: string; mock: any };

export type InterceptionEntry = XOR<IGraphQLEntry, IRESTEntry>;

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
 * Intercepts GraphQL requests matching the provided operation name.
 * Matches on the request URL (e.g. `api?op=<operationName>`) so that each
 * operation gets its own route handler.
 */
async function interceptGraphQLRequest(page: Page, operationName: string, mock: any, onIntercepted: () => void) {
  const requestUrl = new RegExp(`[?&]op=${operationName}(?:&|$)`);

  await page.route(requestUrl, async route => {
    const postData = route.request().postData();
    if (!postData) return route.fallback();

    const body = JSON.parse(postData);

    if (body.operationName !== operationName) {
      debugLog(`[GraphQL] skip ${operationName} (got ${body.operationName})`);
      return route.fallback();
    }

    onIntercepted();
    return await respondWithMockData(route, mock);
  });
}

/**
 * Sets up API interceptors for Playwright tests.
 *
 * @param page - The Playwright `Page` object where the interceptors will be applied
 * @param config - Array of interception configurations
 */
export async function apiInterceptors(page: Page, config: InterceptionEntry[]): Promise<void> {
  const interceptPromises = config.map(({ url, mock, gql }) => {
    const urlRegExp = new RegExp(url || '/api$');
    const interceptorId = createInterceptorId(gql, url);

    debugLog(`[Register] ${interceptorId}`);

    const onHit = () => debugLog(`[Hit] ${interceptorId}`);

    return gql ? interceptGraphQLRequest(page, gql, mock, onHit) : interceptRESTRequest(page, urlRegExp, mock, onHit);
  });

  await Promise.all(interceptPromises);
}
