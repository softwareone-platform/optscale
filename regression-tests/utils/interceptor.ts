import type { Page, Route } from '@playwright/test';
import type { InterceptionEntry } from '@/types';
import { debugLog } from './debug-logging';

const OK_JSON = { status: 200, contentType: 'application/json' } as const;

/** Fulfills `route` with `mock` as JSON. */
const respondWithMockData = <T>(route: Route, mock: T): Promise<void> => route.fulfill({ ...OK_JSON, body: JSON.stringify(mock) });

/** Identifier used in debug logs. */
const createInterceptorId = (gql?: string, url?: string): string => (gql ? `GraphQL:${gql}` : `REST:${url}`);

/** Intercepts REST requests matching `pattern`. */
async function interceptRESTRequest<T>(page: Page, pattern: RegExp, mock: T, onHit: () => void): Promise<void> {
  await page.route(pattern, async route => {
    onHit();
    await respondWithMockData(route, mock);
  });
}

/** Shared URL pattern for every GraphQL operation — all are POSTed to `/api`. */
const GRAPHQL_ENDPOINT = /\/api(\?|$)/;

/** Intercepts GraphQL requests by operation name (all share the `/api` endpoint). */
async function interceptGraphQLRequest<T>(page: Page, operationName: string, mock: T, onHit: () => void): Promise<void> {
  await page.route(GRAPHQL_ENDPOINT, async route => {
    const postData = route.request().postData();
    if (!postData) return route.fallback();

    let actual: string | undefined;
    try {
      actual = (JSON.parse(postData) as { operationName?: string }).operationName;
    } catch {
      return route.fallback();
    }

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

      return gql ? interceptGraphQLRequest(page, gql, mock, onHit) : interceptRESTRequest(page, new RegExp(url ?? '/api$'), mock, onHit);
    })
  );
}
