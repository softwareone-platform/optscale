import fs from "fs";
import path from "path";
import {EUserRole} from "./enums";
import {Page} from "@playwright/test";


export function saveFile(token: string, role: EUserRole): void {
    fs.writeFile(
        path.resolve(__dirname, `token-${role}.txt`),
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

export const getAccessTokenFromCookies = async (page: Page) => {
    const cookies = await page.context().cookies();

    const tokenCookie = cookies.find((cookie) => cookie.name === "token");

    if (!tokenCookie || !tokenCookie.value)
        throw 'Cookie "accessToken" not found';

    return tokenCookie.value;
};

// export const getToken = () => {
//     const tokenFilePath = path.resolve('e2etests/.auth/authToken.json');
//     const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
//     return tokenData.token;
// };