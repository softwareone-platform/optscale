import {APIResponse} from "playwright";
import {BaseRequest} from "./base-request";
import {APIRequestContext} from "@playwright/test";

export class AuthRequest extends BaseRequest {
    readonly request: APIRequestContext;
    readonly userEndpoint: string;
    readonly tokenEndpoint: string;

  constructor(request: APIRequestContext) {
    super(request);
      this.request = request;
        this.userEndpoint = "/auth/v2/users";
        this.tokenEndpoint = "/auth/v2/tokens";
  }

  async authorization(
      email: string,
      password: string,
  ): Promise<APIResponse> {
    return await this.request.post(this.tokenEndpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        password: password,
      },
    });
  }

async getAuthorizationToken(email: string, password: string): Promise<string> {
  const response = await this.authorization(email, password);
  if (response.status() !== 201) {
    throw new Error('Failed to generate token');
  }

  const { token } = await response.json();
  console.log(`Token: ${token}`);
  return token;
}

async getUsers(token: string): Promise<string> {
  const response = await this.request.get(this.userEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status() !== 200) {
    throw new Error('Failed to get users');
  }

  return JSON.stringify(await response.json());
}

async createUser(email: string, password: string, displayName: string): Promise<string> {
  const response = await this.request.post(this.userEndpoint, {
    headers: {
      "Content-Type": "application/json",
      Secret: process.env.CLUSTER_SECRET
    },
    data: {
      email,
      display_name: displayName,
      password,
      verified: true
    }
  });

  if (response.status() !== 201) {
    throw new Error('Failed to create user');
  }

  const user = JSON.stringify(await response.json());
  console.log(`User: ${user}`);
  return user;
}

  async deleteUser(userID: string): Promise<void> {
    const response = await this.request.delete(`${this.userEndpoint}/${userID}`, {
      headers: {
        "Content-Type": "application/json",
        Secret: `${process.env.CLUSTER_SECRET}`
      }
    });
    if (response.status() !== 204) {
      throw new Error(`Failed to delete userID ${userID}`);
    }
    console.log(`UserID ${userID} deleted`);
  }
}