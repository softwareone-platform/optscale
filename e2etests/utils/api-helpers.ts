import { Page } from '@playwright/test';
import { DataSourceBillingResponse } from '../types/api-response.types';

/**
 * Fetches the breakdown expenses from the API.
 *
 * This function waits for a network response that matches the specified `breakdownBy` parameter
 * and triggers the `selectCategorizeBy` function to select the appropriate UI label.
 * It ensures that the response has a status of 200 and returns the parsed JSON response.
 *
 * @template T - The expected type of the response data.
 * @param {Page} page - The Playwright `Page` instance used to intercept and wait for the network response.
 * @param {string} breakdownBy - The query parameter used to filter the breakdown expenses.
 * @param {(label: string, wait: boolean) => Promise<void>} selectCategorizeBy - A function to select the categorize-by option in the UI.
 * @param {string} uiLabel - The label to select in the categorize-by dropdown.
 * @returns {Promise<T>} A promise that resolves to the parsed JSON response typed as `T`.
 */
export async function fetchBreakdownExpenses<T>(
  page: Page,
  breakdownBy: string,
  selectCategorizeBy: (label: string, wait: boolean) => Promise<void>,
  uiLabel: string
): Promise<T> {
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes(`/breakdown_expenses?breakdown_by=${breakdownBy}`) && resp.status() === 200),
    selectCategorizeBy(uiLabel, false),
  ]);

  return response.json();
}

/**
 * Fetches the response for a "DataSource" operation from the API.
 *
 * This function waits for a network response that matches the following criteria:
 * - The request method is POST.
 * - The URL ends with '/api'.
 * - The request body contains a JSON object with an `operationName` of "DataSource".
 *
 * If a matching response is found, it parses and returns the response body as a `DataSourceResponse`.
 *
 * @param {Page} page - The Playwright `Page` instance used to intercept and wait for the network response.
 * @returns {Promise<DataSourceBillingResponse>} A promise that resolves to the parsed response body typed as `DataSourceBillingResponse`.
 * @throws {Error} If the response is not received within the specified timeout or if the JSON parsing fails.
 */
export async function fetchDataSourceResponse(page: Page): Promise<DataSourceBillingResponse> {
  const response = await page.waitForResponse(
    async response => {
      const request = response.request();

      // Must be POST and end in '/api'
      if (request.method() !== 'POST' || !request.url().endsWith('/api')) {
        return false;
      }

      const postData = request.postData();
      if (!postData) return false;

      try {
        const json = JSON.parse(postData);
        return json.operationName === 'DataSource';
      } catch {
        return false; // In case of invalid JSON
      }
    },
    { timeout: 5000 }
  );
  return (await response.json()) as DataSourceBillingResponse;
}
