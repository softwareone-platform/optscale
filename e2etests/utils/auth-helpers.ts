import fs from "fs";
import path from "path";
import {EUserRole} from "./enums";
import {Page, APIRequestContext, request, APIResponse} from "@playwright/test";

export interface LiveDemoAuthResponse {
  organization_id: string;
  email: string;
  password: string;
  created_at: number;
}


export function saveToken(token: string, role: EUserRole): void {
    fs.writeFile(
        path.resolve(`.cache/token-${role}.txt`),
        `${token}`,
        "utf8",
        function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        },
    );
}

export function saveUserID(userID: string): void {
    fs.writeFile(
        path.resolve('.cache/userID.txt'),
        `${userID}`,
        "utf8",
        function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        },
    );
}

export const getAccessTokenFromCookies = async (page: Page) => {
    const cookies = await page.context().cookies();

    const tokenCookie = cookies.find((cookie) => cookie.name === "token");

    if (!tokenCookie || !tokenCookie.value)
        throw 'Cookie "accessToken" not found';

    return tokenCookie.value;
};

export function getAccessTokenFromFile() {
    return fs.readFileSync(path.resolve('.cache/authToken.txt'), {
        encoding: "utf-8",
    });
}

export function saveAuthResponseData(response: any, role: EUserRole): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.resolve(`.cache/auth-response-${role}.json`),
            JSON.stringify(response),
            "utf8",
            function (err) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log("File created!");
                    resolve();
                }
            },
        );
    });
}



export function getValueFromAuthResponse(role: EUserRole, key: string): string {
    const filePath = path.resolve(`.cache/auth-response-${role}.json`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Auth response file does not exist: ${filePath}`);
    }

    const authResponse = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(authResponse[key]);
    return authResponse[key];
}

export class LiveDemoService {
  private static readonly token: string =
    '2621d14dfa1a1a8f11c34ccf0781683c26b1d571d5ac404f142656421f64ec3c';

  private static readonly baseURL: string = 'https://portal.finops.s1.today'; // <-- Replace with real domain

  /**
   * Creates a new APIRequestContext with the necessary headers.
   */
  private static async createContext(): Promise<APIRequestContext> {
    return await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'X-LiveDemo-Token': this.token,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Sends a POST request to /restapi/v2/live_demo with given email and subscribe status.
   * @param email - User's email address
   * @param subscribe - Whether the user wants to subscribe
   */
  static async postLiveDemo(email: string, subscribe: boolean = false): Promise<LiveDemoAuthResponse> {
    const context = await this.createContext();

    const response = await context.post('/restapi/v2/live_demo', {
      data: { email, subscribe },
    });

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Live demo request failed: ${response.status()} - ${errorText}`);
    }

    return response.json();
  }
}
