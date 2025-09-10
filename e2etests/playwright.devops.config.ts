import {defineConfig, devices} from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '.env.local')});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    globalSetup: "./setup/global-setup.ts",
    globalTeardown: "./setup/global-teardown.ts",
    testDir: '../e2etests/dev-ops-tests',
    testIgnore: ['**/regression-tests/**'],
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 0 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : 2,
    /* Individual test timeout,test.slow() annotation triples this value for decorated tests*/
    timeout: 10000,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ["list"],
        ["json", {outputFile: "results.json"}],
        ["html", {open: "never"}],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        actionTimeout: 10000,
        baseURL: process.env.BASE_URL,
        testIdAttribute: 'data-test-id',
        headless: true,
        trace: "retain-on-failure",
        contextOptions: {
            ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
        },
    },

    projects: [
        {
            name: "chrome",
            use: {
                channel: "chrome",
            },
        },
    ],
});
