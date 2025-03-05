import {Page, Route} from "@playwright/test";
import {EventsResponse} from "../test-data/events-data";

interface IInterceptorConfig {
    page: Page;
    urlPattern: string;
    mockResponse: any;
}

export async function interceptApiRequest(config: IInterceptorConfig): Promise<void> {
    const {page, urlPattern, mockResponse} = config;

    await page.route(new RegExp(urlPattern), async (route: Route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(mockResponse),
        });
        console.log(`Intercepted request for urlPattern ${urlPattern}`);
    });
}

export async function interceptEventRequest(config: IInterceptorConfig): Promise<void> {
  const {page, urlPattern, mockResponse} = config;
    await page.route(new RegExp(urlPattern), async (route: Route) => {
        const requestPostData = JSON.parse(route.request().postData() || '{}');
        if (requestPostData.operationName === "events") {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(mockResponse),
            });
            console.log(`Intercepted Event request for operationName ${requestPostData.operationName}`);
        } else {
            throw new Error(`Unexpected operationName: ${requestPostData.operationName}`);
        }
    });
}
export async function interceptDataSourcesRequest(config: IInterceptorConfig): Promise<void> {
    const {page, urlPattern, mockResponse} = config;
    await page.route(new RegExp(urlPattern), async (route: Route) => {
        const requestPostData = JSON.parse(route.request().postData() || '{}');
        if (requestPostData.operationName === "DataSources") {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(mockResponse),
            });
            console.log(`Intercepted Event request for operationName ${requestPostData.operationName}`);
        } else {
            throw new Error(`Unexpected operationName: ${requestPostData.operationName}`);
        }
    });
}
