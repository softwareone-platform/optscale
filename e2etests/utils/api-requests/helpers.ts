import {Page, Route} from "@playwright/test";

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
          return await respondWithMockData(route, mock);
        }
      } catch (error) {
        console.warn("Failed to parse GraphQL POST data:", error);
      }
    }
    return route.fallback();
  });
}
