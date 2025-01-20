import { FullConfig } from '@playwright/test';
import dotenv from "dotenv";

async function globalSetup(config: FullConfig) {
    if (!config) console.error("No config found");

    dotenv.config({
        path: ".env.local",
        override: true,
    });
    console.log(`Tests running on ${process.env.BASE_URL}`);
}

module.exports = globalSetup;