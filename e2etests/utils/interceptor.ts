import { Page, Route } from "@playwright/test";

interface IInterceptorConfig {
  page: Page;
  urlPattern: string;
  mockResponse: any;
}

export async function interceptApiRequest(config: IInterceptorConfig): Promise<void> {
  const { page, urlPattern, mockResponse } = config;

  await page.route(new RegExp(urlPattern), async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockResponse),
    });
  });
}
