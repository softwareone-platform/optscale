import { StoredDemoSession } from '@/types';
import { APIRequestContext, request } from '@playwright/test';
import { DemoAccountCredentials } from '@/types';
import { safeReadJsonFile } from '@/utils/file';
import { env, requireEnv } from '@/utils/env';
import { DEMO_ACCOUNT_SESSION_PATH } from '@/utils/demo-account-session';

export class DemoAccountService {
  private static readonly token: string = env.liveDemoToken;

  /** POSTs to `/restapi/v2/live_demo` and returns the minted credentials. */
  static async getDemoLoginCredentials(email: string, subscribe = false): Promise<DemoAccountCredentials> {
    const context = await this.createContext();

    const response = await context.post('/restapi/v2/live_demo', {
      data: { email, subscribe },
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Demo-account request failed: ${response.status()} - ${errorText}`);
    }

    return (await response.json()) as DemoAccountCredentials;
  }

  /**
   * `true` when a fresh cached session exists for the current host.
   * Host identity is encoded in the cache filename, so cross-host sessions
   * simply won't be found.
   */
  static hasCachedDemoCredentials(): boolean {
    const file = safeReadJsonFile<Partial<StoredDemoSession>>(DEMO_ACCOUNT_SESSION_PATH);
    const cached = file?.demoAccountCredentials;

    return !!cached && isSessionFresh(cached.created_at);
  }

  /** Creates an APIRequestContext with the required headers. */
  private static async createContext(): Promise<APIRequestContext> {
    requireEnv('apiBaseUrl', 'liveDemoToken');

    return request.newContext({
      baseURL: env.apiBaseUrl,
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
