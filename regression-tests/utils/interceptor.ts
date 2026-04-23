import type { Page, Route } from '@playwright/test';
import type { InterceptionEntry } from '@/types';
import { debugLog } from './debug-logging';

const OK_JSON = { status: 200, contentType: 'application/json' } as const;

/** Fulfills a route with `mock` serialised as JSON. */
export const respondWithMockData = <T>(route: Route, mock: T): Promise<void> =>
  route.fulfill({ ...OK_JSON, body: JSON.stringify(mock) });

/** Stable identifier used in debug logs. */
export const createInterceptorId = (gql?: string, url?: string): string =>
  gql ? `GraphQL:${gql}` : `REST:${url}`;

/** Intercepts REST requests matching `pattern`. */
export async function interceptRESTRequest<T>(
  page: Page,
  pattern: RegExp,
  mock: T,
  onHit: () => void,
): Promise<void> {
  await page.route(pattern, async route => {
    onHit();
    await respondWithMockData(route, mock);
  });
}

/**
 * Intercepts GraphQL requests by operation name. Matches on the `?op=<name>`
 * URL param so each operation gets its own handler, then double-checks the
 * `operationName` in the POST body before fulfilling.
 */
async function interceptGraphQLRequest<T>(
  page: Page,
  operationName: string,
  mock: T,
  onHit: () => void,
): Promise<void> {
  const urlPattern = new RegExp(`[?&]op=${operationName}(?:&|$)`);

  await page.route(urlPattern, async route => {
    const postData = route.request().postData();
    if (!postData) return route.fallback();

    const { operationName: actual } = JSON.parse(postData) as { operationName?: string };
    if (actual !== operationName) {
      debugLog(`[GraphQL] skip ${operationName} (got ${actual ?? 'none'})`);
      return route.fallback();
    }

    onHit();
    await respondWithMockData(route, mock);
  });
}

/** Registers every entry in `config` as a Playwright route handler. */
export async function apiInterceptors(page: Page, config: InterceptionEntry[]): Promise<void> {
  await Promise.all(
    config.map(({ url, mock, gql }) => {
      const id = createInterceptorId(gql, url);
      debugLog(`[Register] ${id}`);
      const onHit = () => debugLog(`[Hit] ${id}`);

      return gql
        ? interceptGraphQLRequest(page, gql, mock, onHit)
        : interceptRESTRequest(page, new RegExp(url ?? '/api$'), mock, onHit);
    }),
  );
}
