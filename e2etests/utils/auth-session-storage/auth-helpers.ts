import fs from "fs";
import path from "path";
import {EStorageStatePath, EUserRole} from "../../types/enums";
import {APIRequestContext, request} from "@playwright/test";
import {DemoAuthCredentials, LiveDemoAuthResponse} from "../../types/api-response.types";
import {safeReadJsonFile} from "../file";

const baseAPIUrl: string = process.env.LIVE_DEMO_API || '';

export function getValueFromAuthResponse(role: EUserRole, key: string): string {
  const filePath = path.resolve(`.cache/auth-response-${role}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Auth response file does not exist: ${filePath}`);
  }

  const authResponse = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return authResponse[key];
}

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

  static shouldUseLiveDemo(): boolean {
    const useLiveDemo = process.env.USE_LIVE_DEMO === 'true';
    const isRegressionRun = process.env.IS_REGRESSION_RUN === 'true';
    const shouldUse = useLiveDemo || isRegressionRun;

    if (shouldUse) {
      try {
        LiveDemoService.validateEnvironment();
      } catch (error) {
        console.warn(`Live demo requested but environment invalid: ${error.message}`);
        console.warn('Falling back to default user credentials');
        return false;
      }
    }

    return shouldUse;
  }

  static getDefaultUserStorageState = () => this.shouldUseLiveDemo() ? EStorageStatePath.liveDemoUser : EStorageStatePath.defaultUser;

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
