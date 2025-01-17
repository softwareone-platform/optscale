import {APIResponse} from "playwright";
import {BaseRequest} from "./base-request";
import {APIRequestContext} from "@playwright/test";

export class AuthRequest extends BaseRequest {
    readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    super(request);
      this.request = request;
  }

  async authorization(
      email: string,
      password: string,
  ): Promise<APIResponse> {
    return await this.request.post("/auth/v2/tokens", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    });
  }

  async getAuthorizationToken(
      email: string,
      password: string,
  ): Promise<string> {
    const response = await this.authorization(email, password);
    if (response.status() !== 201) {
      throw new Error('Failed to generate token');
    }
    const responseBody = await response.json();
    const token = JSON.stringify({ token: responseBody.token });
    console.log(`Token: ${token}`);
    return token;
  }


}