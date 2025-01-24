import { test } from "../fixtures/api-fixture";
import { expect } from "@playwright/test";
import { AuthResponse } from "../test-data/test-data-types";
import {generateRandomEmail} from "../utils/random-data";

test.describe("Auth API tests", () => {
    const email = process.env.DEFAULT_USER_EMAIL;
    const password = process.env.DEFAULT_USER_PASSWORD;

    test("Authorize user payload", async ({ authRequest }) => {
        const response = await authRequest.authorization(email, password);
        const payload = JSON.parse(await response.text()) as AuthResponse;

        await test.step("Verify response status and payload fields", async () => {
            expect(response.status()).toBe(201);

            const currentDate = new Date().toISOString().split('T')[0];
            const createdAtDate = payload.created_at.substring(0, 10);
            expect(createdAtDate).toBe(currentDate);
            expect(payload.user_email).toBe(email);
            expect(payload.user_id).not.toBeNull();
            expect(payload.token).not.toBeNull();
            expect(payload.digest).not.toBeNull();
            expect(payload.ip).not.toBeNull();
            expect(payload.valid_until).not.toBeNull();
        });

        await test.step("Assert response payload does not contain unexpected fields", async () => {
            expect(Object.keys(payload).length).toBe(7);
        });
    });

    test("Authorize user with invalid credentials", async ({ authRequest }) => {
        const response = await authRequest.authorization(email, 'invalidPassword');
        expect(response.status()).toBe(403);
    });

    test("Authorize user with invalid email", async ({ authRequest }) => {
        const invalidEmail= generateRandomEmail();
        const response = await authRequest.authorization(invalidEmail, password);
        expect(response.status()).toBe(403);
    })

    test("Authorize user with empty email", async ({ authRequest }) => {
        const response = await authRequest.authorization('', password);
        expect(response.status()).toBe(400);
    })

    test.only("Get users with Cluster Secret", async ({ authRequest }) => {
        const user_ID = process.env.DEFAULT_USER_ID;

        const response = await authRequest.getUsersWithClusterSecret(user_ID);
        expect(response.status()).toBe(200);

    })

});