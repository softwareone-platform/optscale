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
    console.log(JSON.stringify(responseBody));
    const token: string = responseBody.token ;
    console.log(`Token: ${token}`);
    return token;
  }

  async getUsers(token: string): Promise<string> {
    const response = await this.request.get("/auth/v2/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status() !== 200) {
      throw new Error('Failed to get users');
    }
    const responseBody = await response.json();
    const users = (JSON.stringify(responseBody));
    return users;
  }

  async createUser(email: string, password: string, displayName: string): Promise<string> {
    const response = await this.request.post("/auth/v2/users", {
      headers: {
        "Content-Type": "application/json",
        Secret: `${process.env.CLUSTER_SECRET}`
      },
      data: {
        email: email,
        display_name: displayName,
        password: password,
        verified: true
      }
    });
    console.log(JSON.stringify(response));
    if (response.status() !== 201) {
      throw new Error('Failed to create user');
    }
    const responseBody = await response.json();
    const user = (JSON.stringify(responseBody));
    console.log(`User: ${user}`);
    return user;
  }

  async deleteUser(userID: string): Promise<void> {
    const response = await this.request.delete(`/auth/v2/users/${userID}`, {
      headers: {
        "Content-Type": "application/json",
        Secret: `${process.env.CLUSTER_SECRET}`
      }
    });
    if (response.status() !== 204) {
      throw new Error('Failed to delete user');
    }
    console.log(`UserID ${userID} deleted`);
  }
}