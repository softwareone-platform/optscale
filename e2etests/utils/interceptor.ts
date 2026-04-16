import { Page, Route } from "@playwright/test";

/**
 * Interface for interceptor configuration.
 */
export type IInterceptorConfig<T = unknown> =
  | {
  page: Page;
  urlPattern: "/api$";
  mockResponse: T;
  graphQlOperationName: string;
}
  | {
  page: Page;
  urlPattern: Exclude<string, "/api$">;
  mockResponse: T;
  graphQlOperationName?: undefined;
};

const fulfillWithMock = async <T>(route: Route, mockResponse: T) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(mockResponse),
  });
};

export async function interceptApiRequest<T>({
                                               urlPattern,
                                               mockResponse,
                                               page,
                                               graphQlOperationName = undefined,
                                             }: IInterceptorConfig<T>): Promise<void> {
  const patternRegex = new RegExp(urlPattern);
  await page.route(patternRegex, async (route, request) => {
    if (request.method() === "POST" && graphQlOperationName) {
      try {
        const body = JSON.parse(request.postData() || "{}");

        if (body.operationName === graphQlOperationName) {
          return await fulfillWithMock(route, mockResponse);
        }

        return await route.fallback();
      } catch (error) {
        console.warn("Failed to parse POST data:", error);
        return await route.fallback();
      }
    }

    return await fulfillWithMock(route, mockResponse);
  });
}
