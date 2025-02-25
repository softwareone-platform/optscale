import fs from "fs";
import path from "path";
import {EUserRole} from "./enums";
import {Page} from "@playwright/test";


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

// export const getToken = () => {
//     const tokenFilePath = path.resolve('.cache/authToken.json');
//     const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
//     return tokenData.token;
// };