import { FullConfig } from '@playwright/test';
import dotenv from "dotenv";

async function globalSetup(config: FullConfig) {
    if (!config) console.error("No config found");

    dotenv.config({
        path: ".env.local",
        override: true,
    });
    const baseURL = config.projects[0].use.baseURL;
    process.env.baseURL = baseURL;
    console.log(`Tests running on ${process.env.baseURL}`);
}

module.exports = globalSetup;