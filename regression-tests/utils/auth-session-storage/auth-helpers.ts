import { EStorageStatePath } from '@/types';
import { APIRequestContext, request } from '@playwright/test';
import { DemoAuthCredentials, LiveDemoAuthResponse } from '@/types';
import { safeReadJsonFile } from '@/utils/file';
import { env, requireEnv } from '@/utils/env';

const baseAPIUrl: string = env.liveDemoApi;

export class LiveDemoService {
  private static readonly token: string = env.liveDemoToken;

  /**
   * Sends a POST request to /restapi/v2/live_demo with given email and subscribe status.
   */
  static async getDemoLoginCredentials(email: string, subscribe = false): Promise<DemoAuthCredentials> {
    const context = await this.createContext();

    const response = await context.post('/restapi/v2/live_demo', {
      data: { email, subscribe },
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Live demo request failed: ${response.status()} - ${errorText}`);
    }

    return { ...((await response.json()) as LiveDemoAuthResponse), baseApiUrl: baseAPIUrl };
  }

  static hasCachedDemoCredentials(): boolean {
    const file = safeReadJsonFile<{ demoAuthCredentials?: DemoAuthCredentials }>(EStorageStatePath.liveDemoUser);
    const cached = file?.demoAuthCredentials;

    return !!cached && isCurrentDateLower(cached.created_at) && cached.baseApiUrl === baseAPIUrl;
  }

  /** Creates a new APIRequestContext with the necessary headers. */
  private static async createContext(): Promise<APIRequestContext> {
    requireEnv('liveDemoApi', 'liveDemoToken');

    return request.newContext({
      baseURL: baseAPIUrl,
      extraHTTPHeaders: {
        'X-LiveDemo-Token': this.token,
        'Content-Type': 'application/json',
      },
    });
  }
}

const isCurrentDateLower = (createdAt: number): boolean => {
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
  const createdAtPlusSixDays = createdAt + 518400;

  return currentTimestampInSeconds < createdAtPlusSixDays;
};
