import type { Page, Route } from '@playwright/test';
import type { InterceptionEntry } from '@/types';
import { debugLog } from './debug-logging';

const OK_JSON = { status: 200, contentType: 'application/json' } as const;

export interface InterceptionReport {
  neverHit: () => string[];
}

const respondWithMockData = <T>(route: Route, mock: T): Promise<void> => route.fulfill({ ...OK_JSON, body: JSON.stringify(mock) });

const createInterceptorId = (gql?: string, url?: string): string => (gql ? `GraphQL:${gql}` : `REST:${url}`);

async function interceptRESTRequest<T>(page: Page, pattern: RegExp, mock: T, onHit: () => void): Promise<void> {
  await page.route(pattern, async route => {
    onHit();
    await respondWithMockData(route, mock);
  });
}

// Every GraphQL operation is POSTed to the same endpoint.
const GRAPHQL_ENDPOINT = /\/api(\?|$)/;

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

// An interception that registers but never fires is silently useless: the app renders live data
// instead, and the only symptom is a screenshot that drifts with the environment.
export async function apiInterceptors(page: Page, entries: InterceptionEntry[]): Promise<InterceptionReport> {
  const hit = new Set<string>();

  await Promise.all(
    entries.map(({ url, mock, gql }) => {
      const id = createInterceptorId(gql, url);
      debugLog(`[Register] ${id}`);
      const onHit = () => {
        hit.add(id);
        debugLog(`[Hit] ${id}`);
      };

      return gql ? interceptGraphQLRequest(page, gql, mock, onHit) : interceptRESTRequest(page, new RegExp(url ?? '/api$'), mock, onHit);
    })
  );

  const registered = entries.map(({ gql, url }) => createInterceptorId(gql, url));

  return { neverHit: () => registered.filter(id => !hit.has(id)) };
}
