import {EStorageStatePath,} from "../../types/enums";
import {APIRequestContext, request} from "@playwright/test";
import {DemoAuthCredentials, LiveDemoAuthResponse} from "../../types/api-response.types";
import {safeReadJsonFile} from "../file";

const baseAPIUrl: string = process.env.LIVE_DEMO_API || '';

export class LiveDemoService {
  private static readonly token: string = process.env.LIVE_DEMO_TOKEN || '';

  private static validateEnvironment(): void {
    if (!this.token || !baseAPIUrl) {
      throw new Error(
        `Live demo environment variables are not properly configured. ` +
        `Required: LIVE_DEMO_TOKEN and LIVE_DEMO_API. ` +
        `Missing: ${!this.token ? 'LIVE_DEMO_TOKEN ' : ''}${!baseAPIUrl ? 'LIVE_DEMO_API' : ''}`
      );
    }
  }

  /**
   * Sends a POST request to /restapi/v2/live_demo with given email and subscribe status.
   * @param email - User's email address
   * @param subscribe - Whether the user wants to subscribe
   */
  static async getDemoLoginCredentials(email: string, subscribe: boolean = false): Promise<DemoAuthCredentials> {

    const context = await this.createContext();

    const response  = await context.post('/restapi/v2/live_demo', {
      data: {email, subscribe},
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Live demo request failed: ${response.status()} - ${errorText}`);
    }

    return { ...await response.json() as LiveDemoAuthResponse, baseApiUrl: baseAPIUrl };
  }

  static hasCachedDemoCredentials(): boolean {
    const file = safeReadJsonFile(EStorageStatePath.liveDemoUser);

    return file?.demoAuthCredentials &&
      isCurrentDateLower(file.demoAuthCredentials.created_at) &&
      baseAPIUrl === file.demoAuthCredentials.baseApiUrl
  }


  /**
   * Creates a new APIRequestContext with the necessary headers.
   */
  private static async createContext(): Promise<APIRequestContext> {
    LiveDemoService.validateEnvironment();

    return await request.newContext({
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
}
