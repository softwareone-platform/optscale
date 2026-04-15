import { test as base } from '@playwright/test';
import { APIResponse } from 'playwright';
import { APIRequestContext } from '@playwright/test';
import { debugLog } from '../utils/debug-logging';

class AuthClient {
  private readonly tokenEndpoint: string;

  constructor(private readonly request: APIRequestContext) {
    this.tokenEndpoint = `${process.env.API_BASE_URL || ''}/auth/v2/tokens`;
  }

  async authorization(email: string, password: string): Promise<APIResponse> {
    debugLog(`tokenEndpoint: ${this.tokenEndpoint}`);
    return this.request.post(this.tokenEndpoint, {
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
    });
  }
}

export const test = base.extend<{ authRequest: AuthClient }>({
  authRequest: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
});
