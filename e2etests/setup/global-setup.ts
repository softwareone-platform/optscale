import { FullConfig } from '@playwright/test';
import dotenv from "dotenv";

async function globalSetup(config: FullConfig) {
    if (!config) console.error("No config found");

    dotenv.config({
        path: ".env.local",
        override: true,
    });
    console.log(`Tests running on ${process.env.BASE_URL}`);
    console.log(`Ignoring HTTPS errors: ${process.env.IGNORE_HTTPS_ERRORS}`);
    console.log(`SCREENSHOT_UPDATE_DELAY: ${process.env.SCREENSHOT_UPDATE_DELAY}`);
    console.log(`USE_LIVE_DEMO: ${process.env.USE_LIVE_DEMO}`);
}

module.exports = globalSetup;
