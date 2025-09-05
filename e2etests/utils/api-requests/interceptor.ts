import {Page, Route} from "@playwright/test";
import {debugLog} from "../debug-logging";

/** XOR helper so a config must be either GraphQL or REST, not both */
type XOR<T, U> =
  | (T & { [K in Exclude<keyof U, keyof T>]?: never })
  | (U & { [K in Exclude<keyof T, keyof U>]?: never });

/**
 * Represents a GraphQL interception entry.
 *
 * @property {string} gql - The name of the GraphQL operation to intercept.
 * @property {any} mock - The mock data to return when the specified GraphQL operation is intercepted.
 */
type IGraphQLEntry = {
  gql: string;
  mock: any;
};

/**
 * Represents a REST API interception entry.
 *
 * @property {string} url - The URL pattern to intercept.
 * @property {any} mock - The mock data to return when the specified URL is intercepted.
 */
type IRESTEntry = {
  url: string;
  mock: any;
};

/**
 * Represents an API interception entry, which can be either a GraphQL or REST entry.
 *
 * This type uses the XOR utility type to ensure that an entry is either a GraphQL entry or a REST entry, but not both.
 *
 * @property {string} [gql] - The name of the GraphQL operation to intercept (if applicable).
 * @property {string} [url] - The URL pattern to intercept (if applicable).
 * @property {any} mock - The mock data to return when the specified operation or URL is intercepted.
 */
export type InterceptionEntry = XOR<IGraphQLEntry, IRESTEntry>;


const respondWithMockData = async <T>(route: Route, mock: T) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(mock),
  });

/**
 * Handles REST API request interception
 */
async function interceptRESTRequest<T>(
  page: Page,
  pattern: RegExp,
  mock: T
): Promise<void> {
  await page.route(pattern, async (route, request) => {
    debugLog(`Intercepted REST API call for URL pattern: ${pattern}`);
    return await respondWithMockData(route, mock);
  });
}

/**
 * Handles GraphQL request interception
 */
async function interceptGraphQLRequest<T>(
  page: Page,
  pattern: RegExp,
  operationName: string,
  mock: T
): Promise<void> {
  await page.route(pattern, async (route, request) => {
    if (request.method() === "POST") {
      try {
        const body = JSON.parse(request.postData() || "{}");
        if (body.operationName === operationName) {
          debugLog(`Intercepted GraphQL operation: ${body.operationName} for URL pattern: ${pattern}`);
          return await respondWithMockData(route, mock);
        }
      } catch (error) {
        console.warn("Failed to parse GraphQL POST data:", error);
      }
    }
    return route.fallback();
  });
}

export async function apiInterceptors<T>(page: Page, config: InterceptionEntry[]): Promise<void> {
  const interceptPromises = config.map(({url, mock, gql}) => {
    const urlRegExp = new RegExp(url || "/api$")
    return gql
      ? interceptGraphQLRequest(page, urlRegExp, gql, mock)
      : interceptRESTRequest(page, urlRegExp, mock);
  });

  await Promise.all(interceptPromises);
}

