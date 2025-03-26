import {APIResponse} from "playwright";
import {BaseRequest} from "./base-request";
import {APIRequestContext} from "@playwright/test";
import fs from "fs";

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
  const body = await response.json();
  console.log(JSON.stringify(body));
  const { token } = await response.json();
  console.log(`Token: ${token}`);
  return token;
}

async saveAuthorizationResponse(email: string, password: string, user?: string): Promise<void> {
  const response = await this.authorization(email, password);
    if (response.status() !== 201) {
        throw new Error('Failed to authorize user');
    }
  const responseBody = await response.json();
  const userID = responseBody.user_id; // Assuming the response contains a user object with an id

  const filePath = `.cache/auth-response-${userID}.json`;
  fs.writeFileSync(filePath, JSON.stringify(responseBody, null, 2));
  console.log(`Response saved to ${filePath}`);
}

async getUsersWithClusterSecret(userID?: string): Promise<APIResponse> {
let endpoint = this.userEndpoint;
  if (userID) {
    endpoint += `?user_id=${userID}`;
  }
  console.log(endpoint);
  const response = await this.request.get(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Secret: `${process.env.CLUSTER_SECRET}`
    },
  });
  return response;
}

async getUsersWithBadClusterSecret(userID: string): Promise<APIResponse> {
    const response = await this.request.get(`${this.userEndpoint}/${userID}`, {
        headers: {
          "Content-Type": "application/json",
          Secret: 'bad-secret'
        },
    });
  return response;
}
  async createUser(email: string, password: string, displayName: string): Promise<APIResponse> {
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
    return response;
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
