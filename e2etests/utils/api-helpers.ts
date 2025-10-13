import { Page } from '@playwright/test';
import { DataSourceResponse } from '../types/api-response.types';

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

export async function fetchDataSourceResponse(page: Page): Promise<DataSourceResponse> {
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

  // Return response body typed as DataResourceResponse
  return (await response.json()) as DataSourceResponse;
}
