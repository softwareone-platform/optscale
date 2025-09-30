import {Page, Route, test} from "@playwright/test";
import {debugLog} from "../debug-logging";
import {InterceptionEntry} from "../../types/interceptor.types";

/**
 * Sets up API interceptors for Playwright tests and returns a function to verify if all interceptions occurred.
 *
 * @template T - Generic type parameter for flexibility.
 * @param {Page} page - The Playwright `Page` object where the interceptors will be applied.
 * @param {InterceptionEntry[]} config - Array of interception configurations, each specifying the URL, mock data, and whether it's a GraphQL request.
 * @param {boolean} forceFailure - Determines whether the test should fail if some interceptions are not triggered.
 * @returns {Promise<() => void>} - A function that verifies if all configured interceptions were triggered.
 */
export async function apiInterceptors<T>(page: Page, config: InterceptionEntry[], forceFailure: boolean): Promise<() => void> {

    const interceptorHits = new Map<string, boolean>();

    const createHitTracker = (id: string): () => void => {
        debugLog(`(HIT) Request intercepted&mocked ${id}`);
        return () => interceptorHits.set(id, true);
    };

    const interceptPromises = config.map(({url, mock, gql}, index) => {
        const urlRegExp = new RegExp(url || "/api$");
        const interceptorId = createInterceptorId(gql, url);

        // Initialize hit tracking
        interceptorHits.set(interceptorId, false);

        if (gql) {
            return interceptGraphQLRequest(
                page,
                urlRegExp,
                gql,
                mock,
                createHitTracker(interceptorId)
            );
        } else {
            return interceptRESTRequest(
                page,
                urlRegExp,
                mock,
                createHitTracker(interceptorId)
            );
        }
    });

    await Promise.all(interceptPromises);

    return () => {
        const missingInterceptions = Array.from(interceptorHits.entries())
            .filter(([_, wasHit]) => !wasHit)
            .map(([id]) => id);

        if (missingInterceptions.length > 0) {
            const message =
                `${missingInterceptions.length} API interception(s) never occurred:\n` +
                missingInterceptions.map(x => `- ${x}`).join("\n");

            debugLog(message);

            // E2E tests need to set up all interceptions at the test.describe level to avoid
            // duplication for each test. However, not all tests will trigger all interceptions.
            // Therefore, we make this optional to force failure or not.
            test.fail(forceFailure, 'Some API interceptions were not triggered and forceFailure is set to true. See logs for details.');
        }
    };
}


export const respondWithMockData = async <T>(route: Route, mock: T) =>
  route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mock),
  });

export const createInterceptorId = (gql?: string, url?: string): string =>
  gql ? `GraphQL:${gql}` : `REST:${url}`;

/* Handles REST API request interception */
export async function interceptRESTRequest<T>(
  page: Page,
  pattern: RegExp,
  mock: T,
  onIntercepted: () => void
): Promise<void> {
    await page.route(pattern, async (route, request) => {
        onIntercepted();

        try {
            const response = await route.fetch();
            // console.log(`Original API Response Status for ${pattern}: ${response.status()}`);
        } catch (error) {
            // console.warn(`Failed to fetch or parse response for ${pattern}:`, error);
        }

        return await respondWithMockData(route, mock);
    });
}

/* Handles GraphQL request interception */
export async function interceptGraphQLRequest<T>(
  page: Page,
  pattern: RegExp,
  operationName: string,
  mock: T,
  onIntercepted: () => void
): Promise<void> {
    await page.route(pattern, async (route, request) => {
        if (request.method() === "POST") {
            try {
                const body = JSON.parse(request.postData() || "{}");
                if (body.operationName === operationName) {
                    onIntercepted();
                    try {
                        const response = await route.fetch();
                        // console.log(`Original API Response Status for ${operationName}: ${response.status()}`);
                    } catch (error) {
                        // console.warn(`Failed to fetch or parse response for ${operationName}:`, error);
                    }

                    // Still return mock data after inspecting the real response
                    return await respondWithMockData(route, mock);
                }
            } catch (error) {
                console.warn("Failed to parse GraphQL POST data:", error);
            }
        }
        return route.fallback();
    });
}
