import {Page, Route} from "@playwright/test";

type IInterceptorConfig<T> =
  {
    page: Page;
    pattern: RegExp;
    mock: T;
    graphQlOperationName: string | null;
  };

/** XOR helper so a config must be either GraphQL or REST, not both */
type XOR<T, U> =
  | (T & { [K in Exclude<keyof U, keyof T>]?: never })
  | (U & { [K in Exclude<keyof T, keyof U>]?: never });

type IApiGraphQLConfig = {
  /** GraphQL's operation name to match; defaults to POST /api$ */
  graphQlOperationName: string;
  mock: any;
};

type IApiRESTConfig = {
  /** Regex string pattern for the REST endpoint */
  urlPattern: string;
  mock: any;
};

export type IInterceptor = XOR<IApiGraphQLConfig, IApiRESTConfig>;

const fulfillWithMock = async <T>(route: Route, mock: T) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(mock),
  });
};

async function interceptRequest<T>({
                                     pattern,
                                     mock,
                                     page,
                                     graphQlOperationName = null,
                                   }: IInterceptorConfig<T>): Promise<void> {
  await page.route(pattern, async (route, request) => {


    if (request.method() === "POST" && graphQlOperationName) {
      try {
        const body = JSON.parse(request.postData() || "{}");

        if (body.operationName === graphQlOperationName) {
          return await fulfillWithMock(route, mock);
        }

        return await route.fallback();
      } catch (error) {
        console.warn("Failed to parse POST data:", error);
        return await route.fallback();
      }
    }

    return await fulfillWithMock(route, mock);
  });
}

export async function apiInterceptors<T>(page: Page, config: IInterceptor[]): Promise<void> {
  const interceptPromises = config.map(({urlPattern, mock, graphQlOperationName}) => {
    return interceptRequest<T>({
      pattern: new RegExp(urlPattern ? urlPattern : "/api$"),
      mock,
      page,
      graphQlOperationName,
    });
  });

  await Promise.all(interceptPromises);
}

