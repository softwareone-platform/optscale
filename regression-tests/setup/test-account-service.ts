import { StoredTestAccountSession } from '@/types';
import { APIRequestContext, request } from '@playwright/test';
import { TestAccountCredentials } from '@/types';
import { safeReadJsonFile } from '@/utils/file';
import { config, requireEnv } from '@/utils/config';

export class TestAccountService {
  private static readonly token: string = config.testAccountToken;

  static async getTestAccountCredentials(email: string, subscribe = false): Promise<TestAccountCredentials> {
    const context = await this.createContext();

    const response = await context.post('/restapi/v2/live_demo', {
      data: { email, subscribe },
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Test-account request failed: ${response.status()} - ${errorText}`);
    }

    return (await response.json()) as TestAccountCredentials;
  }

  // The filename follows the environment key, not the host, so without the apiBaseUrl check a
  // session cached before an API_BASE_URL_OVERRIDE change would be replayed at the wrong cluster.
  static hasCachedTestAccountCredentials(): boolean {
    const file = safeReadJsonFile<Partial<StoredTestAccountSession>>(config.paths.testAccountSessionFile);
    const cached = file?.testAccountCredentials;
    if (!cached || !isSessionFresh(cached.created_at)) return false;

    return file?.apiBaseUrl === config.apiBaseUrl;
  }

  private static async createContext(): Promise<APIRequestContext> {
    requireEnv('apiBaseUrl', 'testAccountToken');

    return request.newContext({
      baseURL: config.apiBaseUrl,
      extraHTTPHeaders: {
        'X-LiveDemo-Token': this.token,
        'Content-Type': 'application/json',
      },
    });
  }
}

const SIX_DAYS_SECONDS = 6 * 24 * 60 * 60;

/** `true` while the cached session is within its six-day freshness window. */
const isSessionFresh = (createdAt: number): boolean => {
  const nowSeconds = Math.floor(Date.now() / 1000);
  return nowSeconds < createdAt + SIX_DAYS_SECONDS;
};
