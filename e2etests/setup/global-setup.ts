import { FullConfig } from '@playwright/test';
import dotenv from "dotenv";
import fs from "fs";

async function globalSetup(config: FullConfig) {
    if (!config) console.error("No config found");

    dotenv.config({
        path: ".env.local",
        override: true,
    });
    console.log(`Tests running on ${process.env.BASE_URL}`);
    console.log(`Ignoring HTTPS errors: ${process.env.IGNORE_HTTPS_ERRORS}`);
}

module.exports = globalSetup;