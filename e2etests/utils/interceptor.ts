import { Page, Route } from "@playwright/test";

    /**
     * Interface for interceptor configuration.
     */
    interface IInterceptorConfig {
        page: Page;
        urlPattern: string;
        mockResponse: any;
    }

    /**
     * Intercepts API requests and provides mock responses.
     * @param {IInterceptorConfig} config - The configuration for the interceptor.
     * @returns {Promise<void>}
     */
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

    /**
     * Intercepts event requests and provides mock responses.
     * @param {IInterceptorConfig} config - The configuration for the interceptor.
     * @returns {Promise<void>}
     */
    export async function interceptEventRequest(config: IInterceptorConfig): Promise<void> {
        const { page, urlPattern, mockResponse } = config;
        await page.route(new RegExp(urlPattern), async (route: Route) => {
            const requestPostData = JSON.parse(route.request().postData() || '{}');
            if (requestPostData.operationName === "events") {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify(mockResponse),
                });
                console.log(`Intercepted request for operationName ${requestPostData.operationName}`);
            } else {
                await route.continue();
            }
        });
    }

    /**
     * Intercepts data sources requests and provides mock responses.
     * @param {IInterceptorConfig} config - The configuration for the interceptor.
     * @returns {Promise<void>}
     */
    export async function interceptDataSourcesRequest(config: IInterceptorConfig): Promise<void> {
        const { page, urlPattern, mockResponse } = config;
        await page.route(new RegExp(urlPattern), async (route: Route) => {
            const requestPostData = JSON.parse(route.request().postData() || '{}');
            if (requestPostData.operationName === "DataSources") {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify(mockResponse),
                });
                console.log(`Intercepted request for operationName ${requestPostData.operationName}`);
            } else {
                await route.continue();
            }
        });
    }
